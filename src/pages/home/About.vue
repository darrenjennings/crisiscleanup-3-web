<template>
  <HomeLayout class="overflow-auto">
    <template #grid-overlay>
      <div class="grid--overlay homegrid-backdrop" />
    </template>
    <template #grid-content>
      <home-nav />
      <home-actions />
      <div class="grid--main h-screen">
        <!--- Title --->
        <div class="flex flex-col m-5">
          <h1
            class="text-4xl px-0.5 text-crisiscleanup-dark-500 font-bold pb-8"
          >
            About Crisis Cleanup
          </h1>
          <!--- Description --->
          <p class="text-xl px-0.5 pb-5">
            Crisis Cleanup is not a technology. It's a philosophy.
          </p>
          <p class="text-xl px-o.5 pb-8">
            <span class="font-bold">Mission:</span>
            To help voluntary relief organizations help more more people by
            enabling collaborative disaster recovery.
          </p>
        </div>
        <!--- Content --->
        <!--- About Us Video --->
        <div class="video-container m-5">
          <iframe
            class="resp-video"
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/kc_T2giyg9Q"
            frameborder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          />
        </div>
        <!--- About Us Cards --->
        <div class="flex flex-col m-5 pt-10">
          <!-- Left Side Info Cards -->
          <div class="flex flex-row justify-between">
            <!-- Top Left Info Card -->
            <div class="flex-col">
              <div class="flex flex-row m-3 py-5">
                <img
                  src="@/assets/tinycrisiscleanuplogoscreenshot.jpg"
                  class="w-7 h-6"
                />
                <base-text variant="body" class="pt-2">
                  <span class="font-bold">Crisis Cleanup</span>
                  is a collaborative
                  <span class="font-bold">disaster work order</span>
                  management platform that improves coordination, reduces
                  duplication of efforts, imporves efficiency and improves
                  volunteers' experience.
                </base-text>
              </div>
              <!-- Bottom Left Info Card -->
              <div class="flex-col px-2">
                <div class="flex flex-row m-3 py-5">
                  <img
                    src="@/assets/tinycrisiscleanuplogoscreenshot.jpg"
                    class="w-7 h-6"
                  />
                  <base-text variant="body" class="pt-2">
                    <span class="font-bold">Crisis Cleanup</span>
                    helps with the
                    <span class="font-bold">4 "C"s of disaster recovery:</span>
                    Communication, Coordination, Collaboration, and Cooperation
                    (as well as the fifth silent "C" of Competition)
                  </base-text>
                </div>
              </div>
            </div>
            <!-- Right Side Info Cards -->
            <div class="flex-col px-2">
              <!-- Top Right Info Card -->
              <div class="flex flex-row m-3 py-5">
                <img
                  src="@/assets/tinycrisiscleanuplogoscreenshot.jpg"
                  class="w-7 h-6"
                />
                <base-text variant="body" class="pt-2">
                  <span class="font-bold">Crisis Cleaning</span>
                  works best when a large number of volunteer organizations with
                  many volunteers work together
                  <span class="font-bold">
                    to large numbers of people in a large area, all at the same
                    time
                  </span>
                </base-text>
              </div>
              <!-- Bottom Right Info Card -->
              <div class="flex flex-col py-5">
                <div class="flex flex-row m-3">
                  <img
                    src="@/assets/tinycrisiscleanuplogoscreenshot.jpg"
                    class="w-7 h-6"
                  />
                  <base-text variant="body" class="pt-2">
                    <span class="font-bold"
                      >Crisis Cleanup does not create the 4 "R"s of disaster
                      recovery:</span
                    >
                    Relationships, Resources, Roles, and Responsibilites. It
                    cannot fix relationships, create resources, or dictate who
                    does what.
                  </base-text>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Stats -->
        <div class="flex flex-row justify-around m-5">
          <div class="flex flex-col">
            <h1 class="text-3xl font-bold text-center">1700+</h1>
            <base-text
              weight="300"
              variant="body"
              class="crisiscleanup-grey-500"
              >Organizations</base-text
            >
          </div>
          <div class="flex flex-col">
            <h1 class="text-3xl font-bold text-center">80,905+</h1>
            <base-text
              weight="300"
              variant="body"
              class="crisiscleanup-grey-500"
              >Homes and Businesses <br />
              Cleaned and Recovered
            </base-text>
          </div>
          <div class="flex flex-col text-center">
            <h1 class="text-3xl font-bold">$46,929</h1>
            <base-text
              weight="300"
              variant="body"
              class="crisiscleanup-grey-500"
            >
              Saved for disaster <br />
              survivors each day
            </base-text>
          </div>
        </div>
        <!-- View Details Button -->
        <div class="flex justify-around py-2">
          <base-button variant="solid" class="py-2 px-3"
            >View Details</base-button
          >
        </div>
        <!-- Info Card w/ Sketch -->
        <div
          class="my-2 mx-3 bg-white shadow w-70 h-70 text-center align-middle flex-wrap"
        >
          <div class="flex flex-row">
            <div class="flex flex-col w-3/4 justify-around">
              <div class="m-5">
                <h1
                  class="text-center pt-50% px-5 py-5 text-2xl text-crisiscleanup-dark-400 font-hairline"
                >
                  Crisis Cleanup embraces and supports the interests of disaster
                  survivors by providing transparent, collaborative, and
                  privacy-enhancing open source technology to assist those who
                  directly interact with and help survivors.
                </h1>
              </div>
            </div>
            <div class="flex-col m-5 w-1/4">
              <img src="@/assets/aboutussketchss.jpg" class="h-1/2" />
            </div>
          </div>
        </div>
        <!-- Foundational Philosophies -->
        <h1 class="text-4xl px-0.5 text-crisiscleanup-dark-500 font-bold py-8">
          Foundational Philosophies
        </h1>
        <div class="flex flex-row">
          <div class="flex flex-col">
            <img src="@/assets/foundationalphilosophiessketchss.jpg" />
          </div>
          <div class="flex flex-col m-5">
            <ul class="text-xl text-crisiscleanup-dark-400 font-hairline">
              <li>
                Technology should enhance, not replace, inter-organization
                relationships.
              </li>
              <br />
              <li>
                There is no pyramid, and you're not on top. Voluntary
                organizations are co-equal, sovereign and interdependent; no
                single organization is in charge.
              </li>
              <br />
              <li>
                Collaboration and communication should be not only convenient,
                but required
              </li>
              <br />
              <li>
                There is no such thing as the "One App to Rule them All." The
                system should not try to do things it was not intended to do.
              </li>
              <br />
              <li>
                The system tracks property, not people. Consequently, strict
                personal information minimization policies are in place.
              </li>
            </ul>
          </div>
        </div>
        <!-- Info Card w/ Sketch pt2 -->
        <div
          class="my-2 mx-3 bg-white shadow w-70 h-70 content-center flex-wrap align-middle pt-15"
        >
          <div class="flex flex-row justify-around">
            <div class="flex-col w-1/4">
              <img src="@/assets/supportteamsketchss.jpg" class="m-5" />
            </div>
            <div class="flex-col w-3/4 m-7">
              <h1
                class="m-5 px-5 py-5 text-center text-2xl text-crisiscleanup-dark-400 font-hairline"
              >
                Crisis Cleanup's real innovation is the ability to coordinate
                tens of thousands of volunteers from hundreds of organizations
                to thousands of sites after a disaster in a non-heirarchial
                collaborative environment.
              </h1>
            </div>
          </div>
        </div>
      </div>
    </template>
  </HomeLayout>
</template>

<script>
import HomeLayout, { HomeNav, HomeActions } from '@/layouts/Home';

export default {
  name: 'AboutPage',
  components: {
    HomeLayout,
    HomeNav,
    HomeActions,
  },
};
</script>

<style scoped>
.resp-video {
  position: absolute;
  top: 0;
  left: 0;
  border: 0;
}
.video-container {
  position: relative;
  overflow: hidden;
  padding-top: 56.25%;
  justify-content: right;
}
li::before {
  content: '\2022';
  color: #fece09;
}
</style>