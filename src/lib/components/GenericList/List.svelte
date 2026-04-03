<script lang="ts" generics="T extends Record<string, unknown>">
    import type { GenericListProps } from './interfaces';

	let {
		items,
		columns,
		keyExtractor,
    }: GenericListProps<T> = $props();
</script>

<div class="list-container">
	
    <table class="data-table">
        <thead>
            <tr>
                {#each columns as column(column.key)}
                    <th>{ column.title }</th>
                {/each}
            </tr>
        </thead>
        <tbody>
            {#each items as item (keyExtractor(item))}
                <tr>
                    {#each columns as column(column.key)}
                        <td>                           
                            {item[column.key]}                           
                        </td>
                    {/each}
                </tr>
            {/each}
        </tbody>
    </table>

</div>
