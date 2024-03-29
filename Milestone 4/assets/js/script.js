/* 
Milestone 1
Replica della grafica con la possibilità di avere messaggi scritti dall’utente (verdi) e dall’interlocutore (bianco) assegnando due classi CSS diverse
Visualizzazione dinamica della lista contatti: tramite la direttiva v-for, visualizzare nome e immagine di ogni contatto
Milestone 2
Visualizzazione dinamica dei messaggi: tramite la direttiva v-for, visualizzare tutti i messaggi relativi al contatto attivo all’interno del pannello della conversazione
Click sul contatto mostra la conversazione del contatto cliccato
Milestone 3
Aggiunta di un messaggio: l’utente scrive un testo nella parte bassa e digitando “enter” il testo viene aggiunto al thread sopra, come messaggio verde
Risposta dall’interlocutore: ad ogni inserimento di un messaggio, l’utente riceverà un “ok” come risposta, che apparirà dopo 1 secondo.
Milestone 4
Ricerca utenti: scrivendo qualcosa nell’input a sinistra, vengono visualizzati solo i contatti il cui nome contiene le lettere inserite (es, Marco, Matteo Martina -> Scrivo “mar” rimangono solo Marco e Martina)
certo:
Milestone 5
Cancella messaggio: cliccando sul messaggio appare un menu a tendina che permette di cancellare il messaggio selezionato */

const app = new Vue({
  el:'#app',
  data:{
    user:{
      name:'Nome utente',
      avatar:'_io',
    },
    contacts: [
      {
        name: 'Michele',
        avatar: '_1',
        visible: true,
        messages: [
          {
            date: '10/01/2020 15:30:55',
            text: 'Hai portato a spasso il cane?',
            status: 'sent'
          },
          {
            date: '10/01/2020 15:50:00',
            text: 'Ricordati di dargli da mangiare',
            status: 'sent'
          },
          {
            date: '10/01/2020 16:15:22',
            text: 'Tutto fatto!',
            status: 'received'
          }
        ],
      },
      {
        name: 'Fabio',
        avatar: '_2',
        visible: true,
        messages: [
          {
            date: '20/03/2020 16:30:00',
            text: 'Ciao come stai?',
            status: 'sent'
          },
          {
            date: '20/03/2020 16:30:55',
            text: 'Bene grazie! Stasera ci vediamo?',
            status: 'received'
          },
          {
            date: '20/03/2020 16:35:00',
            text: 'Mi piacerebbe ma devo andare a fare la spesa.',
            status: 'sent'
          }
        ],
      },
      {
        name: 'Samuele',
        avatar: '_3',
        visible: true,
        messages: [
          {
            date: '28/03/2020 10:10:40',
            text: 'La Marianna va in campagna',
            status: 'received'
          },
          {
            date: '28/03/2020 10:20:10',
            text: 'Sicuro di non aver sbagliato chat?',
            status: 'sent'
          },
          {
            date: '28/03/2020 16:15:22',
            text: 'Ah scusa!',
            status: 'received'
          }
        ],
      },
      {
        name: 'Luisa',
        avatar: '_4',
        visible: true,
        messages: [
          {
            date: '10/01/2020 15:30:55',
            text: 'Lo sai che ha aperto una nuova pizzeria?',
            status: 'sent'
          },
          {
            date: '10/01/2020 15:50:00',
            text: 'Si, ma preferirei andare al cinema',
            status: 'received'
          }
        ],
      },
    ],
    activeUser:0,
    strMessage:'',
    strSearch:'',
    now:dayjs().format('DD/MM/YYYY HH:mm:ss'),
  },
  methods:{
    visibleChat(index){
      return this.activeUser = index;
    },
    addClass(index){
      return (this.activeUser === index) ? 'active' : null;
    },
    newMessage(){
      this.contacts[this.activeUser].messages.push({
        date: dayjs().format('DD/MM/YYYY HH:mm:ss'),
        text: this.strMessage,
        status: 'sent'
      });
      this.strMessage = '';
      setTimeout(()=>{
        this.contacts[this.activeUser].messages.push({
          date: dayjs().format('DD/MM/YYYY HH:mm:ss'),
          text: 'Ok',
          status: 'received'
        });
      },1000);
    },
    lastAcces(index){
      let time = this.contacts[index].messages;
      return time[time.length-1].date;
    },   
    lastMessage(index){
      let mex = this.contacts[index].messages;
      if(mex[mex.length-1].text.length > 20){
        return mex[mex.length-1].text.slice(0,20) + "...";
      }else{
        return mex[mex.length-1].text;
      }
    },   
    search(){
      let newContacts = this.contacts.filter((element)=>{
        if(!element.name.toLowerCase().includes(this.strSearch.toLowerCase())){
          return element.visible = false
        }else{
          return element.visible = true
        }
      });
    },
  },
})