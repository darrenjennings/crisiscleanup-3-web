<template>
  <div>
    <div class="flex flex-col justify-around">
      <div class="m-5">
        <div class="flex flex-row">
          <base-text variant="body" weight="700">Worksite Completion</base-text>
          <img src="@/assets/outlinestarss.jpg" class="ml-auto h-8" />
        </div>
        <base-text variant="bodysm">
          This is a detailed breakdown of services requested and what items
          remain both open and completed.
        </base-text>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WorksiteCompletion',
};
</script>
