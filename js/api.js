const main = async () => {
  const results = await fetch('https://api.ipdata.co?api-key=1e6228c85a45f48261476e0ef848f0e0ef684a4937154d4a15964de9');
  
  // Variable that stores the data as a Json file.
  const data = await results.json();
  // City extracted from Json file.
  const city = data.city; 
  const country = data.country;

  document.getElementById("city").innerHTML = city;
  document.getElementById("cityFooter").innerHTML = city;

}

main();
  

