function convertToDockerCommand() {
    var containerFile = document.getElementById('containerFile').value;
    var dockerCommand = 'docker run';
  
    try {
      var containerData = jsyaml.load(containerFile);
  
      if (containerData.version && containerData.services) {
        var serviceName = Object.keys(containerData.services)[0];
        var service = containerData.services[serviceName];

        if (service.container_name) {
          dockerCommand += ' --name ' + service.container_name;
        }
  
        if (service.ports) {
            for (var port of service.ports) {
              dockerCommand += ' -p ' + port;
            }
        }
  
        if (service.volumes) {
          for (var volume of service.volumes) {
            dockerCommand += ' -v ' + volume;
          }
        }

        if (service.environment) {
          for (var envKey in service.environment) {
            dockerCommand += ' -e ' + service.environment[envKey];
          }
        }

        if (service.devices) {
          for (var device of service.devices) {
            dockerCommand += ' --device ' + device;
          }
        }
  
        if (service.restart) {
          dockerCommand += ' --restart ' + service.restart;
        }
  
        if (service.image) {
            dockerCommand += ' ' + service.image;
        }
    
      }
  
      // Set the converted command in the result div
      document.getElementById('dockerCommand').innerText = dockerCommand;
    } catch (error) {
      document.getElementById('dockerCommand').innerText = 'Invalid container file format';
    }
  }

  function copyToClipboard() {
    var dockerCommandElement = document.getElementById('dockerCommand');
    var dockerCommandText = dockerCommandElement.innerText;
  
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(dockerCommandText)
        .then(function() {
        //   alert('Command copied to clipboard!');
        })
        .catch(function(error) {
          console.error('Error copying command to clipboard:', error);
        });
    } else {
      var tempInput = document.createElement('textarea');
      tempInput.style.position = 'absolute';
      tempInput.style.left = '-9999px';
      tempInput.value = dockerCommandText;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand('copy');
      document.body.removeChild(tempInput);
    //   alert('Command copied to clipboard!');
    }
  }
  