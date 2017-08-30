app = new Vue({
	el: '.main-content',
	data: {
		items: [],
	},
	mounted: function () {
		var self = this
		// Post.list(function(err, posts) {
		// 	if (err) return alert('Kunde inte ladda posterna')
		// 	self.posts = posts
		// })
		self.items = pageinfos.produkter.map(function (item) {
			item.imgUrl = '/images/'+item.image
			item.type = 'SHOP'
			return item
		})
	},
})