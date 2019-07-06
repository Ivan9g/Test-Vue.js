const url = "https://cors-anywhere.herokuapp.com/https://proxyfordevelopers.com/api/proxies/";

const vm = new Vue({
        el: '#app',
        data: {
          results: [],
          selected: '',
          checkedtype: [],
          checkedAlive: ''
        },
        mounted() {
          axios.get(url).then(response => {
            this.results = response.data
          })
        },
        computed:{
            filteredList() {
                return this.results.filter(elem => {
                    if (this.checkedtype.length < 1 && !this.checkedAlive) return elem.country.indexOf(this.selected) > -1;
                    if (this.checkedtype.length > 0) return elem.country.indexOf(this.selected) > -1
                        && (elem.proxy_type == this.checkedtype[0]
                        || elem.proxy_type == this.checkedtype[1]
                        || elem.proxy_type == this.checkedtype[2]);
                    if (this.checkedAlive) return elem.country.indexOf(this.selected) > -1 && elem.alive == true;
                })
            },
            groupedMakes() {
                var makes=[];
                this.results.forEach((item)=>{
                    if(makes.indexOf(item.country)==-1)makes.push(item.country);
                })
                return makes;
            }
        }
      });
