variable "bucket_name" {
  description = "The name of the S3 bucket"
  type        = string
}

variable "bucket_acl" {
  description = "The ACL for the S3 bucket"
  type        = string
  default     = "private"
}

variable "environment" {
  description = "Deployment environment (e.g., dev, prod)"
  type        = string
  default     = "dev"
}

variable "versioning_enabled" {
  description = "Enable versioning for the S3 bucket"
  type        = bool
  default     = false
}

# Network Variables
variable "vpc_id" {
  description = "The VPC ID where the S3 endpoint will be created"
  type        = string
}

variable "route_table_ids" {
  description = "List of route table IDs associated with the VPC endpoint"
  type        = list(string)
}

variable "aws_region" {
  description = "AWS Region"
  type        = string
}
