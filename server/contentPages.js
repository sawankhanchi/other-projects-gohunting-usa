const axios = require('axios');


    const getData = async () => {

       try {

          const config = {
            headers: {
                "Access-Control-Allow-Origin": "http://localhost:3000",
                "Access-Control-Allow-Methods": "GET,OPTIONS"
            }
        }

        let response = await axios.get('http://localhost:1337/content-pages/5ee4fd9e23be90747723fbbe', config);
        console.log(response.data);

      } catch (error) {
        console.error('here-------------------->>>>>',error);
      }
}

    getData();

  // console.log(data);
