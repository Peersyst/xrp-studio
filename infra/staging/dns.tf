data "cloudflare_zone" "peersyst-tech" {
    name = "peersyst.tech"
}

resource "cloudflare_record" "www" {
    zone_id = data.cloudflare_zone.peersyst-tech.id
    name    = var.project-name
    value   = aws_instance.server.public_ip
    type    = "A"
    proxied = true
}
