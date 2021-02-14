export default {
    async registerCoach(context, data) {
        const userId = context.rootGetters.userId;
        const coachData = {
          firstName: data.first,
          lastName: data.last,
          description: data.desc,
          hourlyRate: data.rate,
          areas: data.areas
        };
    
        const response = await fetch(
          `https://vuee-http-demo-default-rtdb.firebaseio.com//coaches/${userId}.json`,
          {
            method: 'put',
            body: JSON.stringify(coachData)
          }
        );
    
        const responseData = await response.json();
    
        if (!response.ok) {
          const error = new Error(responseData.message || "Failed to fetch!");
          throw error;
        }
    
        
         },

        async loadCoaches(context, payload) {

          if (!payload.forceRefresh && !context.getters.shouldUpdate) {
              return;
          }

          const response = await  fetch(
                `https://vuee-http-demo-default-rtdb.firebaseio.com/coaches.json`

            );
          const responseData = await response.json();
            
          if (!response.ok) {
              // ...
          }
          const coaches = [];

          for (const key in responseData) {
              const coach = {
                id : key,  
                firstName: responseData[key].firstName,
                lastName: responseData[key].lastNAme,
                description: responseData[key].description,
                hourlyRate: responseData[key].hourlyRate,
                areas: responseData[key].areas
              };
              coaches.push(coach);
          }
          context.commit('setCoaches', coaches);
          context.commit('setFetchTimestamp');
        }

       
};