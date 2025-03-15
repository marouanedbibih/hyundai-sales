module "vpc" {
  source         = "./modules/vpc"
  vpc_cidr_block = "10.0.0.0/16"
}

module "security" {
  source     = "./modules/security"
  vpc_id     = module.vpc.vpc_id
  allowed_ip = "0.0.0.0/0"
}

module "ec2" {
  source       = "./modules/ec2"
  vpc_id       = module.vpc.vpc_id
  subnet_id        = module.vpc.devops_subnet_id
  public_subnet_id = module.vpc.public_subnet_id
  security_group_id = module.security.hyundai-sales-sg-id
  key_pair = "../keys/id_rsa.pub"
}

# module "rds" {
#   source    = "./modules/rds"
#   vpc_id    = module.vpc.vpc_id
#   subnet_id = module.vpc.db_subnet
# }

# module "s3" {
#   source   = "./modules/s3"
# }
