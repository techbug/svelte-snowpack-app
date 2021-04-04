const axios = require('axios')

exports.handler = async function(event,context){
	const params = JSON.parse(event.body);
	const { title, type, year, page, id } = params;
	const API_KEY = 'c7b88915';
  
	const url = id
	  ? `https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}&plot=full`
	  : `https://www.omdbapi.com/?apikey=${API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`;
  


	try {
		const res = await axios.get(url);
		console.log(res.data)
		if (res.data.Error) {
			// reject(res.data.Error);
			return {
				statusCode: 400,
				body: res.data.Error
			}
		}
		// resolve(res);
		return {
			statusCode:200,
			body:JSON.stringify(res.data)
		}
	} catch (error) {
		console.error(error.response.status);
		// reject(error.message);
		return {
			statusCode: error.response.status,
			body: error.message
		}
	}

}