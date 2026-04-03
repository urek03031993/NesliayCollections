<script lang="ts" generics="T extends Record<string, unknown>">
  import List from './List.svelte';

  interface Props {
    items: T[];
    keyExtractor: (item: T) => string | number;
    columns: any[];
    searchKeys: (keyof T)[];
    itemsPerPage?: number;
    onRowClick?: (item: T) => void;
  }

  let {
    items,
    keyExtractor,
    columns,
    searchKeys,
    itemsPerPage = 10,
    onRowClick
  }: Props = $props();

  let searchQuery = $state('');
  let currentPage = $state(1);

  // Filtrado
  let filteredItems = $derived.by(() => {
    if (!searchQuery) return items;
    const lower = searchQuery.toLowerCase();
    return items.filter(item => 
      searchKeys.some(key => 
        String(item[key]).toLowerCase().includes(lower)
      )
    );
  });

  // Paginación
  let totalPages = $derived(Math.ceil(filteredItems.length / itemsPerPage));
  let paginatedItems = $derived(
    filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
  );

  $effect(() => {
    // Reset a página 1 cuando cambia la búsqueda
    if (searchQuery) currentPage = 1;
  });
</script>

<div class="list-wrapper">
  <div class="controls">
    <input 
      type="text" 
      placeholder="Buscar..." 
      bind:value={searchQuery}
      class="search-input"
    />
    <span class="results-count">{filteredItems.length} resultados</span>
  </div>

  <List 
    items={paginatedItems}
    {keyExtractor}
    {columns}
    {onRowClick}
    emptyMessage={searchQuery ? "No se encontraron coincidencias" : "No hay datos"}
  />

  {#if totalPages > 1}
    <div class="pagination">
      <button 
        onclick={() => currentPage--} 
        disabled={currentPage === 1}
        class="page-btn"
      >
        Anterior
      </button>
      
      <span class="page-info">Página {currentPage} de {totalPages}</span>
      
      <button 
        onclick={() => currentPage++} 
        disabled={currentPage === totalPages}
        class="page-btn"
      >
        Siguiente
      </button>
    </div>
  {/if}
</div>


