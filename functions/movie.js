const axios = require('axios')	// Netlify는 NodeJS환경이므로 require
const { OMDB_API_KEY } = process.env	// 환경변수에 API키 담기위해사용

exports.handler = async function(event,context){
	const params = JSON.parse(event.body);
	const { title, type, year, page, id } = params;
	// const OMDB_API_KEY = '******'; // 서버(Netlify에 environment) 이거나 로컬(.env)에 저장
  
	const url = id
	  ? `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}&plot=full`
	  : `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`;
  


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