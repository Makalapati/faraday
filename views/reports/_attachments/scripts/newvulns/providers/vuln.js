// Faraday Penetration Test IDE
// Copyright (C) 2013  Infobyte LLC (http://www.infobytesec.com/)
// See the file 'doc/LICENSE' for the license information

angular.module('faradayApp')
    .factory('Vuln', ['BASEURL', '$http', function(BASEURL, $http) {
        Vuln = function(data){
            if(data) {
                this.set(data);
            }
        };

        Vuln.prototype = {
            set: function(data) {
                if(data._id === undefined) {
                    data['_id'] = CryptoJS.SHA1(data.name).toString();
                    //// couch ID including parent id
                    //var id = $scope.target_selected._id + "." + CryptoJS.SHA1($scope.name + "." + $scope.desc).toString();
                    //// object ID without parent
                    //var sha = CryptoJS.SHA1($scope.name + "." + $scope.desc).toString();
                }
                var evidence = [],
                date = obj.value.date * 1000;
                if(typeof(obj.value.attachments) != undefined && obj.value.attachments != undefined) {
                    for(var attachment in obj.value.attachments) {
                        evidence.push(attachment);
                    }
                }
                this.rev = data.rev;
                this.attachments = evidence;
                this.data = data.data;
                this.date = date;
                this.delete = false;
                this.desc = data.desc;
                this.easeofresolution = data.easeofresolution;
                this.impact = data.impact;
                this.metadata = data.metadata;
                this.name = data.name;
                this.obj_id = data.obj_id;
                this.owned = data.owned;
                this.owner = data.owner;
                this.parent = parent;
                this.refs = data.refs;
                this.resolution = data.resolution;
                this.selected = data.selected;
                this.severity = data.severity;
                this.type = "Vulnerability";
                this.web = false;
            },
            delete: function(ws) {
                var self = this;
                return $http.delete(BASEURL + ws + "/" + self._id);
            },
            update: function(data, ws) {
                var self = this;
                return $http.post(BASEURL + ws + "/" + self._id, data)
                    .success(function(data) {
                        if(data.id == self._id){
                            self._rev = data.rev;
                        }
                    });
            },
            save: function(ws) {
                var self = this;
                bulk = {docs:self};
                return $http.post(BASEURL + ws + "/_bulk_docs", JSON.stringify(bulk)).success(function(data) {
                    if(data.id == self._id){
                        self._rev = data.rev;
                    }
                });
            }
        }

        return Vuln;
    }]);
