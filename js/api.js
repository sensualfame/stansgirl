const main = async () => {
  const results = await fetch('https://api.ipdata.co?api-key=a84a536211b7f8d838608979cbfa046317ca14c1d2f3425dd1db396a');
  
  // Variable that stores the data as a Json file.
  const data = await results.json();
  // City extracted from Json file.
  const city = data.city; 
  const country = data.country;

  document.getElementById("city").innerHTML = city;
  document.getElementById("cityFooter").innerHTML = city;

}

main();
  

