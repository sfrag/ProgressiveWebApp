(function(){

  
  const app = {
    apiURL: `https://api.github.com/search/repositories?q=created:%22${dates.startDate()}+..+${dates.endDate()}%22%20language:javascript&sort=stars&order=desc`
  }

  Date.prototype.yyyymmdd = function(){
    let mm = this.getMonth() + 1;
    let dd = this.getDate();
    
    return [this.getFullYear(),
            (mm>9 ? '' : '0') + mm,
            (dd>9 ? '' : '0') + dd
          ].join('-');
  };

  const dates = {
    starDate: function(){
      const starDate = new Date();
      starDate.setDate(starDate.getDate() - 7);
      return starDate.yyyymmdd();
    },
    endDate: function() {
      const endDate = new Date();
      return endDate.yyyymmdd();
    }
  }

  app.getTrends = function(){
    fetch(app.apiURL)
      .then(response => response.json())
      .then(function(trends){
        console.log('From server...')
        app.updateTrends(trends.items)
      }).catch(function(err){
        // Error
      });
  }
  
  document.addEventListener('DOMContentLoaded', function(){
    app.getTrends()
  })

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
     .register('service-worker.js')
     .then(function() { 
        console.log('Service Worker Registered'); 
      });
  }    
})()