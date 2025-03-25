variable "allowed_ssh_ip" {
  description = "The IP address allowed to SSH into the EC2 instance"
  type        = string
  default     = "0.0.0.0/0"  
}

variable "region" {
  description = "AWS Region"
  type        = string
  default     = "eu-west-3"
}