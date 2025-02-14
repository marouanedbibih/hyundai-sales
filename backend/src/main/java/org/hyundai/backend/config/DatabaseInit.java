package org.hyundai.backend.config;

import com.github.javafaker.Faker;
import lombok.RequiredArgsConstructor;
import org.hyundai.backend.client.Client;
import org.hyundai.backend.client.ClientRepository;
import org.hyundai.backend.sale.PaymentMethod;
import org.hyundai.backend.sale.Sale;
import org.hyundai.backend.sale.SaleRepository;
import org.hyundai.backend.user.User;
import org.hyundai.backend.user.UserRepository;
import org.hyundai.backend.user.UserRole;
import org.hyundai.backend.vehicle.Vehicle;
import org.hyundai.backend.vehicle.VehicleRepository;
import org.hyundai.backend.vehicle.VehicleStatus;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Random;
import java.util.Set;
import java.util.stream.Collectors;

@Configuration
@RequiredArgsConstructor
public class DatabaseInit implements CommandLineRunner {

    private final UserRepository userRepository;
    private final ClientRepository clientRepository;
    private final VehicleRepository vehicleRepository;
    private final SaleRepository saleRepository;
    private final PasswordEncoder passwordEncoder;

    private final Faker faker = new Faker();
    private final Random random = new Random();
    private final String PASSWORD = "password";

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        this.initUsers();
        this.initClients(10);
        this.initVehicles(15);
        this.initSales(2);
    }

    private void initUsers() {
        List<User> users = new ArrayList<>();

        // Admin user
        users.add(User.builder()
                .name("Admin")
                .username("admin")
                .password(passwordEncoder.encode(PASSWORD))
                .role(UserRole.ADMIN)
                .build());

        // Adding 5 sellers
        for (int i = 1; i <= 5; i++) {
            users.add(User.builder()
                    .name("Seller " + i)
                    .username("seller" + i)
                    .password(passwordEncoder.encode(PASSWORD))
                    .role(UserRole.SELLER)
                    .build());
        }

        // Adding 5 after-sales managers
        for (int i = 1; i <= 5; i++) {
            users.add(User.builder()
                    .name("After Sales Manager " + i)
                    .username("after-sales-manager" + i)
                    .password(passwordEncoder.encode(PASSWORD))
                    .role(UserRole.AFFTER_SALES_MANAGER)
                    .build());
        }

        userRepository.saveAll(users);
    }

    private void initClients(int count) {
        List<Client> clients = new ArrayList<>();
        for (int i = 0; i < count; i++) {
            clients.add(Client.builder()
                    .firstName(faker.name().firstName())
                    .lastName(faker.name().lastName())
                    .email(faker.internet().emailAddress())
                    .phone(faker.phoneNumber().cellPhone())
                    .address(faker.address().fullAddress())
                    .build());
        }
        clientRepository.saveAll(clients);
    }

    private void initVehicles(int count) {
        List<Vehicle> vehicles = new ArrayList<>();
        for (int i = 0; i < count; i++) {
            vehicles.add(Vehicle.builder()
                    .model(faker.company().name())
                    .year(faker.number().numberBetween(2015, 2024))
                    .price(faker.number().randomDouble(2, 15000, 70000))
                    .color(faker.color().name())
                    .status(random.nextBoolean() ? VehicleStatus.AVAILABLE : VehicleStatus.SOLD)
                    .isPromotion(random.nextBoolean())
                    .discount(random.nextBoolean() ? faker.number().randomDouble(2, 500, 3000) : null)
                    .build());
        }
        vehicleRepository.saveAll(vehicles);
    }

    private void initSales(int count) {
        // Retrieve all necessary data
        List<Client> clients = clientRepository.findAll();
        List<Vehicle> availableVehicles = vehicleRepository.findAll().stream()
                .filter(vehicle -> vehicle.getStatus() == VehicleStatus.AVAILABLE)
                .collect(Collectors.toList());
        List<User> sellers = userRepository.findAll().stream()
                .filter(user -> user.getRole() == UserRole.SELLER)
                .collect(Collectors.toList());

        // Check if there are any missing data and skip the sale generation if so
        if (clients.isEmpty() || availableVehicles.isEmpty() || sellers.isEmpty()) {
            System.out.println("Skipping sales generation due to missing data.");
            return;
        }

        // Store sales and prevent duplicate client-vehicle pairs
        List<Sale> sales = new ArrayList<>();
        Set<String> uniqueClientVehiclePair = new HashSet<>();

        for (int i = 0; i < count; i++) {
            // Randomly select client, vehicle, and seller
            Client randomClient = clients.get(random.nextInt(clients.size()));
            Vehicle randomVehicle = availableVehicles.get(random.nextInt(availableVehicles.size()));
            User randomSeller = sellers.get(random.nextInt(sellers.size()));

            // Ensure no duplicate client-vehicle pair (no client can buy the same vehicle
            // twice)
            String clientVehiclePair = randomClient.getId() + "-" + randomVehicle.getId();
            if (uniqueClientVehiclePair.contains(clientVehiclePair)) {
                continue; // Skip this sale if already exists
            }

            uniqueClientVehiclePair.add(clientVehiclePair);

            // Create the sale object
            Sale sale = Sale.builder()
                    .date(LocalDate.now().minusDays(random.nextInt(365))) // Random date in the past year
                    .totalPrice(randomVehicle.getPrice()) // Random price
                    .paymentMethod(random.nextBoolean() ? PaymentMethod.FULL : PaymentMethod.INSTALLMENTS) // Random
                                                                                                           // payment
                                                                                                           // method
                    .installments(random.nextBoolean() ? random.nextInt(12) + 1 : null) // Random installment value if
                                                                                        // installment selected
                    .client(randomClient) // Client reference
                    .user(randomSeller) // Seller reference
                    .vehicle(randomVehicle) // Vehicle reference
                    .build();

            // Add the sale to the list
            sales.add(sale);

            // Update the vehicle status to SOLD and immediately save it
            randomVehicle.setStatus(VehicleStatus.SOLD);
            vehicleRepository.save(randomVehicle); // Save vehicle status update

        }

        // Save all the generated sales to the database
        if (!sales.isEmpty()) {
            saleRepository.saveAll(sales);
        }

        System.out.println("Successfully created " + sales.size() + " sales.");
    }

}
