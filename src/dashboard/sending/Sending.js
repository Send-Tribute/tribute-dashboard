import React from 'react';

export default function Sending(props) {
  // Active Tributes Injected
  // Inactive Tributes Injected
  // Discover Tributes Injected
  return(
    <div>
      SENDING
      <br/>
      Available Tribute:
      { props.children }
    </div>
  );
}
