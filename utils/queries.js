module.exports = {


	query_get_promo_info_full : "SELECT b.*, p.id as promo_id, p.name as promo_name, p.created_at, p.expired_at, p.description, p.count FROM ibero.branch_promotions bp INNER JOIN ibero.promotions p ON bp.id_promotion=p.id INNER JOIN ibero.branch b ON bp.id_branch=b.id WHERE bp.id_promotion=?;",
	query_get_branchs_by_id : "SELECT * FROM branch WHERE business_id=?",
	query_get_categories : "SELECT c.name, c.id_categories as id FROM categories c INNER JOIN business b WHERE c.id_categories=b.categorie",
	query_get_categories_by_business_type : "SELECT id_categories as id, name FROM categories WHERE id_business_type=?",
	query_get_business_order_by_name : "SELECT * FROM business WHERE active=1 ORDER BY name",
	query_get_business_by_state_order_by_name : "SELECT * FROM business WHERE state=? ORDER BY name"

};