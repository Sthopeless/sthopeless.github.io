---
layout: post
title:  "Proxmox Debian with Docker and Portainer"
date: 2020-05-01 13:00:00
comments: false
permalink: proxmox_debian_docker_and_portainer
published: true
categories:
- Proxmox
image: assets/images/portainer_logo.png
---

Fast LXC container with updated Debian, Docker and Portainer ready to go..  
  
To install simply run this on Proxmox terminal:  
```
clear; bash -c "$(wget -qLO - https://git.sthopeless.com/sthope/proxmox_portainer/raw/branch/master/create_container.sh)"
```  

[Git Repository](https://git.sthopeless.com/sthope/proxmox_portainer)