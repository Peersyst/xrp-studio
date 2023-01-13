resource "aws_instance" "server" {
    ami                         = "ami-0b95c8042c84717b9"
    instance_type               = "t2.xlarge"
    iam_instance_profile = aws_iam_instance_profile.server.name
    associate_public_ip_address = true
    security_groups = [aws_security_group.sg.name]
    tags = {
        Name = "${terraform.workspace}-server"
    }
    root_block_device {
        delete_on_termination = true
        volume_size = 64
        volume_type = "gp2"
    }
    user_data = <<EOF
#!/bin/bash
echo -e "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIJxbZKy18AeHll07GfQUOaldwii6JjjzFF12fyvKBOqw terraform" >> /home/ubuntu/.ssh/authorized_keys
echo -e "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDGzMrMCXTiti7fOhH5abcSzG29w7Eu2YaYD0clhpfN0KnLkF4wZNTLqytZyUnhjjP7tGYlgvsjmhZc9jaXPxSpi8PH4FKcHbFbUinbTR8PyAbJsgtJuLA4LQeO/MSo3YYGn3WW3WNC40It5dRFwxoTCp75LUXEtI9kVi0/ubLHBTLjl4c2bcobKdZjWAqrzPCUmgjNq84dN407KadeTt7jyvzDfIlEiaqu3zXlrpyDC/wbGg3oDpJvAtcdhsQg3QYQvtnS9djv75VIcKtOLv5D3+Akw0WRa04XDBmWySGBLC+CKK8eINPJTu/VihId3Jj1tnk7Z/Qe9YqCwu4fV8Qp adriacarrera" >> /home/ubuntu/.ssh/authorized_keys
EOF
}

resource "aws_security_group" "sg" {
    name        = "${terraform.workspace}-sg"
    egress = [
        {
            description      = "for all outgoing traffics"
            from_port        = 0
            to_port          = 0
            protocol         = "-1"
            cidr_blocks      = ["0.0.0.0/0"]
            ipv6_cidr_blocks = ["::/0"]
            prefix_list_ids  = []
            security_groups  = []
            self             = false
        }
    ]

    ingress {
        from_port   = 22
        to_port     = 22
        protocol    = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }
    ingress {
        from_port   = 80
        to_port     = 80
        protocol    = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }

    tags = {
        Name = "${terraform.workspace}-sg"
    }
}

locals {
    secrets = jsondecode(data.aws_secretsmanager_secret_version.current.secret_string)
}

resource "null_resource" "setup" {
    provisioner "file" {
        content      = templatefile("${path.module}/docker-compose.yml", {
            projectName: var.project_name
        })
        destination = "/home/ubuntu/docker-compose.yml"
    }

    provisioner "remote-exec" {
        inline = [
            "cd /home/ubuntu",
            "sudo apt-get update",
            "sudo apt-get -y -qq install docker.io docker-compose git",
            "sudo docker login -u peersyst -p ${var.DOCKER_READONLY_TOKEN}",
            "sudo touch test",
            "sudo echo 'DB_USER=${local.secrets["DB_USER"]}' >> .env",
            "sudo echo 'DB_PASSWORD=${local.secrets["DB_PASSWORD"]}' >> .env",
            "sudo echo 'DB_DATABASE=${local.secrets["DB_DATABASE"]}' >> .env",
            "sudo echo 'REDIS_PASSWORD=${local.secrets["REDIS_PASSWORD"]}' >> .env",
            "sudo docker-compose up -d",
        ]
    }

    connection {
        type        = "ssh"
        user        = "ubuntu"
        host        = aws_instance.server.public_ip
        private_key = var.SSH_PRIVATE_KEY
        agent       = false
    }
}
