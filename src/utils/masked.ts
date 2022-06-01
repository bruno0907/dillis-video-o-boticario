export enum MaskType {
  mobile = 'mobile',  
 }  

export const masked = (
  value: string,
  mask: keyof typeof MaskType,
) => {
  switch(mask) {
    case (MaskType.mobile): 
      value = value.replace(/^[0]/, '')
      value = value.replace(/\D/g, '') 
      value = value.replace(/^(\d{2})(\d)/g, '$1 $2')
      value = value.replace(/^(\d{2}).(\d{5})(\d)/g, '$1 $2-$3')      
      return value.substring(0, 13)
  }
  return value
}
