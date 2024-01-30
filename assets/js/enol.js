function generateXML() {
    const templateURL = document.getElementById('templateURL').value;
    const beta = document.getElementById('beta').checked;
    const category = document.getElementById('category').value;
    const date = document.getElementById('date').value;
    const support = document.getElementById('support').value;
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const project = document.getElementById('project').value;
    const registry = document.getElementById('registry').value;
    const repository = document.getElementById('repository').value;
    const bindTime = document.getElementById('bindTime').checked;
    const branchTag = document.getElementById('branchTag').value;
    const privileged = document.getElementById('privileged').checked;
    const puid = document.getElementById('puid').value;
    const pgid = document.getElementById('pgid').value;
    const networkMode = document.getElementById('networkMode').value;
    const hostPort = document.getElementById('hostPort').value;
    const containerPort = document.getElementById('containerPort').value;
    const protocol = document.getElementById('protocol').value;
    const configVolume = document.getElementById('configVolume').value;
    const configContainerDir = document.getElementById('configContainerDir').value;
    const configMode = document.getElementById('configMode').value;
    const dataVolume = document.getElementById('dataVolume').value;
    const dataContainerDir = document.getElementById('dataContainerDir').value;
    const dataMode = document.getElementById('dataMode').value;
    const version = document.getElementById('version').value;
    const webUI = document.getElementById('webUI').value;
    const icon = document.getElementById('icon').value;
    const extraParams = document.getElementById('extraParams').value;
    const donateText = document.getElementById('donateText').value;
    const donateLink = document.getElementById('donateLink').value;
    const donateImg = document.getElementById('donateImg').value;
    const baseImage = document.getElementById('baseImage').value;
  
    const xmlString = `<?xml version="1.0" encoding="utf-8"?>
      <Container>
        <TemplateURL>${templateURL}</TemplateURL>
        <Beta>${beta}</Beta>
        <Category>${category}</Category>
        <Date>${date}</Date>
        <Support>${support}</Support>
        <Name>${name}</Name>
        <Description>${description}</Description>
        <Project>${project}</Project>
        <Registry>${registry}</Registry>
        <Repository>${repository}</Repository>
        <BindTime>${bindTime}</BindTime>
        <Branch>
          <Tag>${branchTag}</Tag>
        </Branch>
        <Privileged>${privileged}</Privileged>
        <Environment>
          <Variable>
            <Name>PUID</Name>
            <Value>${puid}</Value>
          </Variable>
          <Variable>
            <Name>PGID</Name>
            <Value>${pgid}</Value>
          </Variable>
        </Environment>
        <Networking>
          <Mode>${networkMode}</Mode>
          <Publish>
            <Port>
              <HostPort>${hostPort}</HostPort>
              <ContainerPort>${containerPort}</ContainerPort>
              <Protocol>${protocol}</Protocol>
            </Port>
          </Publish>
        </Networking>
        <Data>
          <Volume>
            <HostDir>${configVolume}</HostDir>
            <ContainerDir>${configContainerDir}</ContainerDir>
            <Mode>${configMode}</Mode>
          </Volume>
          <Volume>
            <HostDir>${dataVolume}</HostDir>
            <ContainerDir>${dataContainerDir}</ContainerDir>
            <Mode>${dataMode}</Mode>
          </Volume>
        </Data>
        <Version>${version}</Version>
        <WebUI>${webUI}</WebUI>
        <Icon>${icon}</Icon>
        <ExtraParams>${extraParams}</ExtraParams>
        <DonateText>${donateText}</DonateText>
        <DonateLink>${donateLink}</DonateLink>
        <DonateImg>${donateImg}</DonateImg>
        <BaseImage>${baseImage}</BaseImage>
      </Container>`;
  
    document.getElementById('generatedXML').textContent = xmlString;
  }
  