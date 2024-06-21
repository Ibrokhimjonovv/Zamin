import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { URL } from '../hooks/fetchdata';

const Tests = () => {
    return (
      <>
        <div>
          <h5>Kursga bog'langan testni boshlash</h5>
          <Link to="/testing">Boshlash</Link>
        </div>
      </>
    ) 
}
export default Tests;
