variable "ami_id" {
  description = "The AMI ID for the EC2 instances"
  type        = string
  default     = "ami-06e02ae7bdac6b938" 
}

variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t3.medium"
}

variable "key_pair" {
  description = "The SSH key pair name"
  type        = string
}

variable "vpc_id" {
  description = "The VPC ID"
  type        = string
}

variable "subnet_id" {
  description = "The subnet ID"
  type        = string 
}

variable "public_subnet_id" {
  description = "The public subnet ID"
  type        = string
  
}

variable "security_group_id" {
  description = "The security group ID"
  type        = string
}



