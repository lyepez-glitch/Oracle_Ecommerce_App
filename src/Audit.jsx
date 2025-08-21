import { useState } from 'react';
import axios from 'axios';

function Audit({ setAudits, audits }) {
  return (
    <div className="auditContainer"> {/* Container for the entire section */}
    <div style={{backgroundColor:'#F3F4F6'}} className="auditDivider"></div>
    <div style={{textAlign:'left',marginLeft: '26%', backgroundColor: '#F3F4F6',color:'#2563EB',fontWeight:'bold',padding:'0',paddingTop:'10px'}}>Audit log</div>
    <div className="auditDivider" style={{borderColor:'#2563EB',marginBottom:'20px',backgroundColor:'#F3F4F6'}}></div>
    <div style={{backgroundColor:'#F3F4F6'}} className="auditDivider"></div>
    <div className="numLogEntries" style={{backgroundColor:'#D1D5DB',width:'83%',marginLeft:'180px',borderRadius:'0',textAlign:'left',marginTop:'20px'}}>{audits.length} audit log entries</div>
    <div className="auditLabels" style={{display: 'flex',justifyContent: 'space-evenly',gap: '200px',width:'83%',marginLeft:'180px',marginTop:'20px',backgroundColor:'#D1D5DB',borderRadius:'0px',borderBottom:'1px solid black',fontWeight:'bold'}}>
      <span>Salary</span>
      <span>Type</span>
      <span className="auditLabelDate">Date</span>
    </div>
      <div className="auditsContainer">

        {audits && audits.length > 0 ? (
          audits.map((audit) => (
            <div className="audit" key={audit.id}>
              <p>{audit.salary}</p>
              <p>{audit.type}</p>
              <p className="auditDate">{audit.date}</p>
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
