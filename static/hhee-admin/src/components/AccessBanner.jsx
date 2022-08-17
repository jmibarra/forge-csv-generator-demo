import React from 'react';

import WarningIcon from '@atlaskit/icon/glyph/warning';

import Banner from '@atlaskit/banner';

const AccessBanner = () => {
  return (
    <Banner
      appearance="warning"
      icon={<WarningIcon label="" secondaryColor="inherit" />}
      isOpen
    >
      <b>Acceso no permitido.</b> Solo se puede ingresar desde el proyecto HHEE.
    </Banner>
  );
};

export default AccessBanner;