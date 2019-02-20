# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.require_version ">= 1.8"

ANSIBLE_VERSION = "2.4.*"

ISM_SHARED_FOLDER_TYPE = ENV.fetch("ISM_SHARED_FOLDER_TYPE", "nfs")
if ISM_SHARED_FOLDER_TYPE == "nfs"
  if not Vagrant::Util::Platform.linux? then
    ISM_MOUNT_OPTIONS = ['vers=3', 'udp', 'actimeo=1']
  end
else
  if ENV.has_key?("ISM_MOUNT_OPTIONS")
    ISM_MOUNT_OPTIONS = ENV.fetch("ISM_MOUNT_OPTIONS").split
  else
    ISM_MOUNT_OPTIONS = ["rw"]
  end
end

Vagrant.configure(2) do |config|
  config.vm.box = "bento/ubuntu-16.04"

  config.vm.synced_folder ".", "/vagrant", type: ISM_SHARED_FOLDER_TYPE, mount_options: ISM_MOUNT_OPTIONS
  config.vm.synced_folder "~/.aws", "/home/vagrant/.aws", type: ISM_SHARED_FOLDER_TYPE, mount_options: ISM_MOUNT_OPTIONS


  config.vm.synced_folder "~/.aws", "/home/vagrant/.aws"

  config.vm.provider :virtualbox do |vb|
    vb.memory = 2048
    vb.cpus = 2
  end

  # CRA dev server port
  config.vm.network :forwarded_port, guest: 3000, host: 3000
  
  # NFS
  config.vm.network "private_network", ip: "192.168.110.219"

  # Change working directory to /vagrant upon session start.
  config.vm.provision "shell", inline: <<SCRIPT
    if ! grep -q "cd /vagrant" "/home/vagrant/.bashrc"; then
      echo "cd /vagrant" >> "/home/vagrant/.bashrc"
    fi
SCRIPT

  config.vm.provision "ansible_local" do |ansible|
    ansible.compatibility_mode = "2.0"
    ansible.install = true
    ansible.install_mode = "pip_args_only"
    ansible.pip_args = "ansible==#{ANSIBLE_VERSION}"
    ansible.playbook = "deployment/ansible/ism-watershed-wellness-snapshot.yml"
    ansible.galaxy_role_file = "deployment/ansible/roles.yml"
    ansible.galaxy_roles_path = "deployment/ansible/roles"
  end
end
