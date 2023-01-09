data "aws_ami" "ubuntu" {
    most_recent = true

    filter {
        name   = "name"
        values = ["ubuntu/images/hvm-ssd/ubuntu-*20*-amd64-server-*"]
    }

    filter {
        name   = "virtualization-type"
        values = ["hvm"]
    }

    owners = ["099720109477"] # Canonical
}

resource "aws_instance" "server" {
    ami                         = data.aws_ami.ubuntu.id
    instance_type               = "t2.medium"
    associate_public_ip_address = true
    security_groups = [aws_security_group.sg.name]
    tags = {
        Name = "${terraform.workspace}-server"
    }
    root_block_device {
        delete_on_termination = true
        volume_size = 16
        volume_type = "gp2"
    }
    user_data = <<EOF
#!/bin/bash
echo -e "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIJxbZKy18AeHll07GfQUOaldwii6JjjzFF12fyvKBOqw terraform" >> /home/ubuntu/.ssh/authorized_keys
echo -e "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDGzMrMCXTiti7fOhH5abcSzG29w7Eu2YaYD0clhpfN0KnLkF4wZNTLqytZyUnhjjP7tGYlgvsjmhZc9jaXPxSpi8PH4FKcHbFbUinbTR8PyAbJsgtJuLA4LQeO/MSo3YYGn3WW3WNC40It5dRFwxoTCp75LUXEtI9kVi0/ubLHBTLjl4c2bcobKdZjWAqrzPCUmgjNq84dN407KadeTt7jyvzDfIlEiaqu3zXlrpyDC/wbGg3oDpJvAtcdhsQg3QYQvtnS9djv75VIcKtOLv5D3+Akw0WRa04XDBmWySGBLC+CKK8eINPJTu/VihId3Jj1tnk7Z/Qe9YqCwu4fV8Qp adriacarrera" >> /home/ubuntu/.ssh/authorized_keys
echo -e "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQDUea4rDBXSnAUITsZihY3Br6Cy7F1Ngcy05WRSxEx9CR6mapjxw1usFzr+6gCwdNFeveGY7tFavLBSaHMQrPCSGym9aQbLomECtxwvJ4ok6BV1S7z3UUMPl8yyzHM04ckGHGMurQcaA3s9b72f2VTriVIWsYygL9Lc0cZWu9irDJ+clLpVK0iw0xeWhUrCR72fLrdfpOMd36nxfT0ONcS/MJjWTxkyjyKS6iFJr3AxvqJ7vV0zwiOSm3mcqUssSQM4RN773cb1P8VhU7BqlLIo/6R1ZXd7N51WuJr37lTbhAFfZo1sLQgZiwJFmjG6RpUQKA6tOwr2/wztBUtWQCHXPtdHdElwYpbYj2uBDBC+Tyydc/gN4qlZvpE+Htivv1is2YK9NWBzDMz0yRxKpkc++Suqr1mN2r5zAIpU2XsbbVkwPIA1XFYSqpdsKDFc1OClOoEeCsh8OdzF7oWLMvyl7QWAE1DBCvsCQQiLbljNhAft0TvTeghurlPDCZ3b3DlnZ61dtNaFlGzI/LqiC5hfhGjxbUQOsh8uri34jZLx66ermKVZHJjF3jpNmmx70ReCtZY6TYocNSOv/aCdSK4rihQ4ZSKbq6ceAFoe9nTsp6jlr6r3YzEMS0vtqRRTr+jzO/B1dfwXXMukF4IxY+pZWlQZTuNPa188kB3EJycmBQ== agusmillanjimenez@10-192-83-189client.eduroam.upc.edu
" >> /home/ubuntu/.ssh/authorized_keys
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

resource "null_resource" "setup" {
    provisioner "file" {
        content      = templatefile("${path.module}/docker-compose.yml", {
            projectName: var.project-name
            branch: var.branch
            awsAccessKeyId: var.aws-access-key-id
            awsSecretAccessKey: var.aws-secret-access-key
        })
        destination = "/home/ubuntu/docker-compose.yml"
    }

    provisioner "remote-exec" {
        inline = [
            "cd /home/ubuntu",
            "sudo apt-get update",
            "sudo apt-get -y -qq install docker.io docker-compose git",
            "sudo docker login -u peersyst -p ${var.DOCKER_READONLY_TOKEN}",
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
