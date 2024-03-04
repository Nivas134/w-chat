import React, { useEffect, useState } from "react";
import { getSampleData } from "../api/testApi";

function SampleData() {
  const [data, setdata] = useState({});

  useEffect(() => {
    fetchSampleData();
  }, []);

  const fetchSampleData = async () => {
    const sdata = await getSampleData();
    console.log("SDATA", sdata);
    setdata(sdata.data);
  };

  return <div>sampleData - {data.message}</div>;
}

export default SampleData;
