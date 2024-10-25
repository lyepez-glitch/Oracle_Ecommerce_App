import { useState } from 'react';
import axios from 'axios';

function Audit({ setAudits, audits }) {
  return (
    <div className="auditContainer"> {/* Container for the entire section */}
      <h2 style={{ margin: '0 0 10px 0' }}>Audits</h2> {/* Header above the audits */}
      <div className="auditsContainer">
        {audits && audits.length > 0 ? (
          audits.map((audit) => (
            <div className="audit" key={audit.id}>
              <p>Salary: {audit.salary}</p>
              <p>Type: {audit.type}</p>
              <p>Date Changed: {audit.date}</p>
            </div>
          ))
        ) : (
          <div className="noAudits">No audits available</div>
        )}
      </div>
    </div>
  );
}

export default Audit;
