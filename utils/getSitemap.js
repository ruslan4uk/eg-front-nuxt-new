import axios from 'axios'

export default async function() {

    return await axios.get( (process.env.BASE_URL || 'https://api.excursguide.ru/api/v2') + '/sitemap')
        .then(res => {
            let route = [];

            let route_tour = res.data.tours.map(x => '/excursion/' + x.id);

            let route_guide = res.data.tours.map(x => '/i/' + x.user_id + '/excursion');

            return route.concat(route_tour, route_guide)
        })

};
