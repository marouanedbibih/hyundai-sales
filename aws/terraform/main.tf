module "vpc" {
  source         = "./modules/vpc"
  vpc_cidr_block = "10.0.0.0/16"
}

module "security" {
  source     = "./modules/security"
  vpc_id     = module.vpc.vpc_id
  allowed_ip = "0.0.0.0/0"
}

# module "ec2" {
#   source       = "./modules/ec2"
#   vpc_id       = module.vpc.vpc_id
#   subnets      = module.vpc.private_subnets
# }

# module "rds" {
#   source    = "./modules/rds"
#   vpc_id    = module.vpc.vpc_id
#   subnet_id = module.vpc.db_subnet
# }

# module "s3" {
#   source   = "./modules/s3"
# }
