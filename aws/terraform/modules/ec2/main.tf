resource "aws_instance" "sonarqube" {
  ami                         = var.ami_id
  instance_type               = var.instance_type
  subnet_id                   = var.subnet_id
  security_groups             = [var.security_group_id]
  key_name                    = aws_key_pair.devops.key_name
  associate_public_ip_address = true

  tags = {
    Name = "sonarqube"
  }
}

resource "aws_instance" "nexus" {
  ami                         = var.ami_id
  instance_type               = var.instance_type
  subnet_id                   = var.subnet_id
  security_groups             = [var.security_group_id]
  key_name                    = aws_key_pair.devops.key_name
  associate_public_ip_address = true

  tags = {
    Name = "nexus"
  }

}

resource "aws_instance" "monitoring" {
  ami                         = var.ami_id
  instance_type               = var.instance_type
  subnet_id                   = var.subnet_id
  security_groups             = [var.security_group_id]
  key_name                    = aws_key_pair.devops.key_name
  associate_public_ip_address = true

  tags = {
    Name = "monitoring"
  }
}

resource "aws_key_pair" "devops" {
  key_name   = "devops"
  public_key = file(var.key_pair)
}

