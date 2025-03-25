variable "vpc_id" {
  description = "The VPC ID where security groups will be created"
  type        = string
}

variable "allowed_ip" {
  description = "Allowed IP address"
  type        = string
  default     = "0.0.0.0/0"
}
