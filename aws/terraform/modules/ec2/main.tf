# EC2 instances
resource "aws_instance" "sonarqube" {
  ami             = var.ami_id
  instance_type   = var.instance_type
  subnet_id       = var.devops_subnet_id
  security_groups = [aws_security_group.devops_sg.id]
  key_name        = aws_key_pair.devops.key_name
}

resource "aws_instance" "nexus" {
  ami             = var.ami_id
  instance_type   = var.instance_type
  subnet_id       = var.devops_subnet_id
  security_groups = [aws_security_group.devops_sg.id]
  key_name        = aws_key_pair.devops.key_name

}

resource "aws_instance" "monitoring" {
  ami             = var.ami_id
  instance_type   = var.instance_type
  subnet_id       = var.devops_subnet_id
  security_groups = [aws_security_group.devops_sg.id]
  key_name        = aws_key_pair.devops.key_name
}

# EC2 key pair
resource "aws_key_pair" "devops" {
  key_name   = "devops"
  public_key = file(var.key_pair)
}
