output "vpc_id" {
  value = aws_vpc.main.id
}

output "devops_subnet_id" {
  value = aws_subnet.devops.id
}

output "prod_subnet_1_id" {
  value = aws_subnet.prod_1.id
}

output "prod_subnet_2_id" {
  value = aws_subnet.prod_2.id
}

output "public_subnet_id" {
  value = aws_subnet.public.id
}
