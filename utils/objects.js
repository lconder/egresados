const moment = require('moment');

module.exports = {

	branch(rows){
		let custom = {
			branch : rows[0]
		};
		return custom;
	},

	branchs_by_business(business){

		let custom =  {
			error : 0,
			business: business
		}
		return custom;
	},

	editPromo(info_promo, branchs) {

		info_promo.forEach((item) => {
			branchs.forEach((branch) => {
				if(item.id===branch.id) {
					branch.active = true
				}
			})
		});

		let promo = info_promo[0]

		var custom = {	
			promo_id : promo.promo_id || '',
			promo_name : promo.promo_name || '',
			promo_description : promo.description || '',
			promo_created_at : moment(promo.created_at).format("DD-MM-YYYY") || moment().format("DD-MM-YYYY"),
			promo_expired_at : moment(promo.expired_at).format("DD-MM-YYYY") || moment().format("DD-MM-YYYY"),
			promo_count : promo.count || 0,
			branchs: branchs
		}
		return custom

	},

	success(description) {
		var custom = {
			error: 0,
			description: description
		}

		return custom
	}

}