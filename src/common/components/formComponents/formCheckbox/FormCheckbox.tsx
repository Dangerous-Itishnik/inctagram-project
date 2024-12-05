import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { Checkbox, CheckboxProps } from '@/common/components/CheckBox'

type Props<T extends FieldValues> = Omit<
  UseControllerProps<T>,
  'disabled' | 'rules' | 'shouldUnregister'
> &
  Omit<CheckboxProps, 'checked' | 'onValueChange'>

export const FormCheckbox = <T extends FieldValues>({ control, ...rest }: Props<T>) => {
  // Убедимся, что useController получает правильный тип данных для поля, например, boolean
  const {
    field: { onBlur, onChange, ref, value },
  } = useController<T>({
    control,
    disabled: rest.disabled,
    name: rest.name, // имя поля передаем как есть
  })

  return (
    <Checkbox
      {...rest}
      checked={value} // передаем значение для отображения
      onBlur={onBlur} // обрабатываем потерю фокуса
      onCheckedChange={onChange} // обрабатываем изменения состояния чекбокса
      ref={ref} // ссылка на элемент
    />
  )
}
