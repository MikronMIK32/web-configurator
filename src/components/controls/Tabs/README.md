## Описание

Компонент Tabs. Для него реализован компонент обертка для отображения количества непройденных валидаций `<TabFutureErrorWrapper />`

## Использование

Для использования обертки необходимо обернуть весь компонент `Tabs `в `TabFutureErrorWrapper`, далее необходимо прописать в проп fieldNamesByTabs массив вида:

[{ id: 'tab_id', fields: ['field_name'] }]

```tsx
<TabFutureErrorWrapper fieldNamesByTabs={[ { id: 'tab_1', field: ['field'] } ]}>
	<Tabs>
		<Tabs.Tab title="Title" id="tab_1">
			<Form.Field name="field" />
		</Tabs.Tab>
	</Tabs>
</TabFutureErrorWrapper>
```
