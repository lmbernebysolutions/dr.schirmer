'use client';

import React from 'react';

const GlobalAppointmentTriggers = () => {
  return (
    <div style={{ display: 'none' }}>
      {/* Versteckte Trigger-Buttons für das Medatixx Plugin */}
      {/* Das Plugin sucht beim Laden nach .terminbuchung-trigger */}
      
      {/* Zschorlau */}
      <button 
        id="trigger-zschorlau"
        type="button" 
        className="terminbuchung-trigger" 
        data-configid="3c139fe0-e8d4-42af-90ea-4a0d6f45eb75"
      >
        Trigger Zschorlau
      </button>

      {/* Aue */}
      <button 
        id="trigger-aue"
        type="button" 
        className="terminbuchung-trigger" 
        data-configid="4e78d804-7777-4bb7-8959-841aaf62926e"
      >
        Trigger Aue
      </button>
    </div>
  );
};

export default GlobalAppointmentTriggers;
