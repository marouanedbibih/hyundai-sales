output "sonarqube_public_ip" {
  description = "Public IP of the SonarQube instance"
  value       = aws_instance.sonarqube.public_ip
}

output "sonarqube_private_ip" {
  description = "Private IP of the SonarQube instance"
  value       = aws_instance.sonarqube.private_ip
}

output "sonarqube_instance_id" {
  description = "Instance ID of the SonarQube instance"
  value       = aws_instance.sonarqube.id
}

output "nexus_public_ip" {
  description = "Public IP of the Nexus instance"
  value       = aws_instance.nexus.public_ip
}

output "nexus_private_ip" {
  description = "Private IP of the Nexus instance"
  value       = aws_instance.nexus.private_ip
}

output "nexus_instance_id" {
  description = "Instance ID of the Nexus instance"
  value       = aws_instance.nexus.id
}

output "monitoring_public_ip" {
  description = "Public IP of the Monitoring instance"
  value       = aws_instance.monitoring.public_ip
}

output "monitoring_private_ip" {
  description = "Private IP of the Monitoring instance"
  value       = aws_instance.monitoring.private_ip
}

output "monitoring_instance_id" {
  description = "Instance ID of the Monitoring instance"
  value       = aws_instance.monitoring.id
}
