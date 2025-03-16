variable "cluster_name" {
  description = "The name of the EKS cluster"
  type        = string
}

variable "subnet_ids" {
  description = "List of subnets for EKS"
  type        = list(string)
}
