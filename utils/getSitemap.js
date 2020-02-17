import axios from 'axios'

export default async function() {

    return await axios.get( (process.env.BASE_URL || 'https://api.excursguide.ru/api/v2') + '/sitemap')
        .then(res => {
            let route = [];

            let route_tour = res.data.tours.map(x => '/excursion/' + x.id);

            let route_guide = res.data.tours.map(x => '/i/' + x.user_id);
            let route_excursion = res.data.tours.map(x => '/i/' + x.user_id + '/excursion');
            let route_responses = res.data.tours.map(x => '/i/' + x.user_id + '/responses');
            let route_contact = res.data.tours.map(x => '/i/' + x.user_id + '/contact');

            return route.concat(route_tour, route_guide, route_excursion, route_responses, route_contact)
        })
};
