/** required: /js/services/auth.js */

new Vue({
  el: '#dynamic-form',
  data: {
    section: 'sign-in', // sign-in | sign-up
    state: 'filling', // filling | loading
    message: '',
    sign_in: { email: '', password: '' },
    sign_up: { name: '', email: '', password: '', confirm_password: '' }
  },
  methods: {
    goToSection: function(to){
      if(this.state !== 'filling') return;

      if(!['sign-in', 'sign-up'].includes(to)){
        notify({ type: 'danger', text: 'Sessão inválida' })
        return;
      }

      this.section = to;
    },
    submitSignIn: async function(){
      if(this.state !== 'filling') return;

      this.state = 'loading';
      
      await (async () => {
        const { email, password } = this.sign_in;
  
        const error = [
          [!email, 'É  obrigatório preencher o email'],
          [!password, 'É obrigatório preencher a senha']
        ].find(([hasError]) => hasError)?.[1]
  
        if(error){
          notify({ type: 'warning', text: error })
          return;
        }
        
        const res = await login({ email, password })
  
        if(!res.result){
          notify({ type: 'danger', text: res.response })
          return;
        }
        
        notify({ type: 'success', text: res.response })
        
        setTimeout(() => window.location.reload(), 500);
      })()

      if(this.state === 'loading') this.state = 'filling';
      else{
        let old_state = this.state;
        setTimeout(() => {
          if(this.state === old_state) this.state = 'filling';
        }, 3 * 1000)
      }
    },
    submitSignUp: async function(){
      if(this.state !== 'filling') return;

      this.state = 'loading';

      await (async () => {
        const { name, email, password, confirm_password } = this.sign_up;
  
        const error = [
          [!name, 'É obrigatório preencher o nome'],
          [!email, 'É obrigatório preencher o email'],
          [!password, 'É obrigatório preencher a senha'],
          [!confirm_password, 'É obrigatório confirmar a senha'],
          [password !== confirm_password, 'A senha e a confirmação de senha devem ser iguais']
        ].find(([hasError]) => hasError)?.[1]
  
        if(error){
          notify({ type: 'warning', text: error });
          return;
        }

        const res = await registerUser({ name, email, password, confirm_password })
  
        if(!res.result){
          notify({ type: 'danger', text: res.response })
          return;
        }
        
        notify({ type: 'success', text: 'Conta criada com sucesso! Faça o login para acessar a plataforma' });

        this.section = 'sign-in';
        this.sign_in.email = email;
      })()

      if(this.state === 'loading') this.state = 'filling';
      else{
        let old_state = this.state;
        setTimeout(() => {
          if(this.state === old_state) this.state = 'filling';
        }, 3 * 1000)
      }
    }
  }
})