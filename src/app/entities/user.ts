export class User {
  id: number
  fullName: string
  userName: string
  avatarUrl: string
  lasta_access_date: Date
  lasta_modify_date: Date

  role: 'R_CEO' | 'R_TRPSTR' | 'R_DSGNR' | 'R_DSPTCHR' | 'R_CRTR' | 'R_SQR' | 'R_CSTMR'
}
