output "vpc_id" {
  value = aws_vpc.main.id
}

output "devops_subnet_id" {
  value = aws_subnet.devops.id
}

output "prod_subnet_id" {
  value = aws_subnet.prod.id
}

output "storage_subnet_id" {
  value = aws_subnet.storage.id
}

output "public_subnet_id" {
  value = aws_subnet.public.id
}