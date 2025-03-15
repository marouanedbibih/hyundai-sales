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
  default     = "../../../keys/id_rsa.pub"
}

variable "devops_subnet_id" {
  description = "The subnet ID for the DevOps EC2 instances"
  type        = string
  default =  aws_subnet.devops.id 
}
