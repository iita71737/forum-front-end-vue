<template>
  <div class="container py-5">
    <!-- AdminNav Component -->
    <admin-nav />
    <table class="table">
      <thead class="thead-dark">
        <tr>
          <th scope="col">
            #
          </th>
          <th scope="col">
            Email
          </th>
          <th scope="col">
            Role
          </th>
          <th scope="col" width="140">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <th scope="row">
            {{ user.id }}
          </th>
          <td>{{ user.email }}</td>
           <td>{{ user.isAdmin ? 'admin' : 'user' }}</td>
          <td>
            <template v-if="user.id !== profile.id">
              <button
                v-if="user.isAdmin"
                type="button"
                class="btn btn-link"
                @click.stop.prevent="toggleUserRole(user.id)"
              >
                set as user
              </button>
              <button
                v-else
                type="button"
                class="btn btn-link"
                @click.stop.prevent="toggleUserRole(user.id)"
              >
                set as admin
              </button>
            </template>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import AdminNav from "../components/AdminNav.vue";

const dummyData = {
  users: [
    {
      id: 1,
      name: "root123",
      email: "root@example.com",
      password: "$2a$10$K2x6pQHkzPEKzw86x8Tc0.bfW7QVdA2Ls4AXBFkFu7xHG3UgA4Mli",
      isAdmin: true,
      image: "https://i.imgur.com/KVFFj35.jpeg",
      createdAt: "2021-07-05T09:58:39.000Z",
      updatedAt: "2021-08-08T16:49:05.000Z",
    },
    {
      id: 2,
      name: "user1",
      email: "user1@example.com",
      password: "$2a$10$knlgkc6iz7TSC1RADrSjmukYkaQgIc8JSVp1ltz614/F9SK.h/pqa",
      isAdmin: false,
      image: null,
      createdAt: "2021-07-05T09:58:39.000Z",
      updatedAt: "2021-08-21T14:30:09.000Z",
    },
    {
      id: 3,
      name: "user2",
      email: "user2@example.com",
      password: "$2a$10$1UaQ5KZLbMCJztUGRWP/uOtIaKel7TQFHIbozRf4LPysvFLu3UOO6",
      isAdmin: false,
      image: null,
      createdAt: "2021-07-05T09:58:39.000Z",
      updatedAt: "2021-08-21T02:03:29.000Z",
    },
    {
      id: 11,
      name: "root3",
      email: "ryan@gmail.com",
      password: "$2a$10$RlVjZ25mKa8aULENpsmZK.OBFxGUjicjsv2FVnmOXkdtn.yW14oRu",
      isAdmin: false,
      image: null,
      createdAt: "2021-07-05T10:20:05.000Z",
      updatedAt: "2021-07-05T10:32:11.000Z",
    },
    {
      id: 21,
      name: "hans",
      email: "hans@yahoo.com",
      password: "$2a$10$x1t6Xd/2gpTd2VjJHGoBd.NsmIZhv57MvwjMBVsB67qFh0ueCa2ja",
      isAdmin: false,
      image: null,
      createdAt: "2021-07-16T03:24:28.000Z",
      updatedAt: "2021-07-16T03:24:28.000Z",
    },
    {
      id: 31,
      name: "dd",
      email: "dd@dd",
      password: "$2a$10$iWJT2aS0M1DD5IqV2bo.quSOQibm8AHy/mztGRFTBlNz1ep0Vz4XO",
      isAdmin: false,
      image: null,
      createdAt: "2021-08-09T06:02:14.000Z",
      updatedAt: "2021-08-09T06:02:14.000Z",
    },
    {
      id: 41,
      name: "a",
      email: "a@a",
      password: "$2a$10$qPHPuJRtyeuvXclCo1x9nOGhXY140wMbaES5mdwTByqN81Wr/jy1K",
      isAdmin: false,
      image: null,
      createdAt: "2021-08-09T06:05:10.000Z",
      updatedAt: "2021-08-09T06:05:10.000Z",
    },
    {
      id: 51,
      name: "hello",
      email: "hello@example.com",
      password: "$2a$10$050DEPCXf./NI7dEOK7xHeXWiFYD0mZ4Ni99WfV18Uvuz2ujbKyVq",
      isAdmin: false,
      image: null,
      createdAt: "2021-08-22T05:57:25.000Z",
      updatedAt: "2021-08-22T05:57:25.000Z",
    },
    {
      id: 61,
      name: "888",
      email: "888@gmail.com",
      password: "$2a$10$jQbtulJ32N/nk4.1dU44TOzYLQWC7ES169fX49yiDLTNS4Jf0qusa",
      isAdmin: false,
      image: null,
      createdAt: "2021-08-22T06:08:19.000Z",
      updatedAt: "2021-08-22T06:08:19.000Z",
    },
    {
      id: 71,
      name: "424449435",
      email: "424449435@qq.com",
      password: "$2a$10$ubFRYFKcva9dKrYzg9W39OEZIjWwCHrOEILXk7a0oZpcDSTZvmLsG",
      isAdmin: false,
      image: null,
      createdAt: "2021-08-23T07:45:26.000Z",
      updatedAt: "2021-08-23T07:45:26.000Z",
    },
    {
      id: 81,
      name: "test",
      email: "test@example.com",
      password: "$2a$10$w5bcczmxLzWr/lE9a6fgz.toso5IO1oetOBMHZJK/fM3mGAEtsrAK",
      isAdmin: false,
      image: null,
      createdAt: "2021-08-25T11:13:24.000Z",
      updatedAt: "2021-08-25T11:13:24.000Z",
    },
  ],
};

const dummyUser = {
  profile: {
    id: 3,
    name: "user2",
    email: "user2@example.com",
    password: "$2a$10$1UaQ5KZLbMCJztUGRWP/uOtIaKel7TQFHIbozRf4LPysvFLu3UOO6",
    isAdmin: false,
    image: null,
    createdAt: "2021-07-05T09:58:39.000Z",
    updatedAt: "2021-08-21T02:03:29.000Z",
    Comments: [
      {
        id: 9,
        text: "Aperiam reprehenderit corrupti ut.",
        UserId: 3,
        RestaurantId: 9,
        createdAt: "2021-07-05T09:58:39.000Z",
        updatedAt: "2021-07-05T09:58:39.000Z",
        Restaurant: {
          id: 9,
          name: "Roman Kunde",
          tel: "(051) 925-0555 x1731",
          address: "131 Hoyt Mission",
          opening_hours: "08:00",
          description:
            "Et dolorum voluptas.\nSint eveniet ratione id praesentium totam.\nImpedit aliquam nobis quia pariatur consequatur quae eos quas cum.",
          image:
            "https://loremflickr.com/320/240/restaurant,food/?random=55.144782599599694",
          viewCounts: 47,
          createdAt: "2021-07-05T09:58:39.000Z",
          updatedAt: "2021-08-20T15:08:22.000Z",
          CategoryId: 2,
        },
      },
      {
        id: 12,
        text: "Eveniet vitae voluptas omnis voluptatem voluptatem qui.",
        UserId: 3,
        RestaurantId: 12,
        createdAt: "2021-07-05T09:58:39.000Z",
        updatedAt: "2021-07-05T09:58:39.000Z",
        Restaurant: {
          id: 12,
          name: "Mrs. Dallin Farrell",
          tel: "469-023-3429",
          address: "539 Ines Haven",
          opening_hours: "08:00",
          description:
            "Est voluptates reiciendis in qui qui. Ipsa omnis id quam omnis ut soluta et aliquam. Atque voluptas quo eveniet. Blanditiis mollitia non soluta quidem. Sapiente explicabo quo ut aspernatur.",
          image:
            "https://loremflickr.com/320/240/restaurant,food/?random=3.244622818947862",
          viewCounts: 0,
          createdAt: "2021-07-05T09:58:39.000Z",
          updatedAt: "2021-07-05T09:58:39.000Z",
          CategoryId: 4,
        },
      },
      {
        id: 15,
        text: "Sint aut voluptatibus esse aut maxime dignissimos blanditiis a.",
        UserId: 3,
        RestaurantId: 15,
        createdAt: "2021-07-05T09:58:39.000Z",
        updatedAt: "2021-07-05T09:58:39.000Z",
        Restaurant: {
          id: 15,
          name: "Miss Alda Gibson",
          tel: "973-829-4302 x72994",
          address: "82826 Hilton Estates",
          opening_hours: "08:00",
          description:
            "Porro deserunt delectus ut officiis reiciendis animi magni assumenda placeat. Occaecati ut in quos et et. Repellendus at molestias omnis quae rerum. Blanditiis deserunt corporis aliquam molestiae delectus eos enim quasi aut.",
          image:
            "https://loremflickr.com/320/240/restaurant,food/?random=85.30074855159819",
          viewCounts: 0,
          createdAt: "2021-07-05T09:58:39.000Z",
          updatedAt: "2021-07-05T09:58:39.000Z",
          CategoryId: 5,
        },
      },
      {
        id: 17,
        text: "Est ipsum occaecati suscipit qui laborum.",
        UserId: 3,
        RestaurantId: 17,
        createdAt: "2021-07-05T09:58:39.000Z",
        updatedAt: "2021-07-05T09:58:39.000Z",
        Restaurant: {
          id: 17,
          name: "Johnathan Lowe",
          tel: "978.861.5244 x080",
          address: "914 Cole Expressway",
          opening_hours: "08:00",
          description: "illum",
          image:
            "https://loremflickr.com/320/240/restaurant,food/?random=76.7964021859454",
          viewCounts: 0,
          createdAt: "2021-07-05T09:58:39.000Z",
          updatedAt: "2021-07-05T09:58:39.000Z",
          CategoryId: 4,
        },
      },
      {
        id: 18,
        text: "Animi qui minima distinctio dignissimos et.",
        UserId: 3,
        RestaurantId: 18,
        createdAt: "2021-07-05T09:58:39.000Z",
        updatedAt: "2021-07-05T09:58:39.000Z",
        Restaurant: {
          id: 18,
          name: "Myrtis Kozey",
          tel: "1-801-414-3373",
          address: "320 Eldora Lodge",
          opening_hours: "08:00",
          description:
            "Nihil nam aperiam omnis iure debitis qui culpa doloremque. Aut qui quia sed aliquam pariatur dolores sint blanditiis. Sunt et et dolorem aliquid hic. Minima aut deleniti excepturi.\n \rIn ea sed aliquid hic est modi possimus. Ullam ullam quaerat molestiae id voluptatem optio impedit impedit minima. Iure corporis natus qui qui assumenda iste odio nesciunt.\n \rQuas nam dicta corrupti. Ea non enim doloremque. Excepturi ut sint neque ad et et.",
          image:
            "https://loremflickr.com/320/240/restaurant,food/?random=93.18866181363335",
          viewCounts: 1,
          createdAt: "2021-07-05T09:58:39.000Z",
          updatedAt: "2021-08-23T07:45:50.000Z",
          CategoryId: 2,
        },
      },
      {
        id: 22,
        text: "Eum omnis facilis autem aperiam.",
        UserId: 3,
        RestaurantId: 22,
        createdAt: "2021-07-05T09:58:39.000Z",
        updatedAt: "2021-07-05T09:58:39.000Z",
        Restaurant: {
          id: 22,
          name: "Ashlynn Willms",
          tel: "(225) 252-4334",
          address: "8350 Milton Passage",
          opening_hours: "08:00",
          description:
            "Voluptatem cumque vel eum voluptatem repellendus tempora ut commodi praesentium.",
          image:
            "https://loremflickr.com/320/240/restaurant,food/?random=12.582063281545386",
          viewCounts: 1,
          createdAt: "2021-07-05T09:58:39.000Z",
          updatedAt: "2021-07-08T16:51:24.000Z",
          CategoryId: 1,
        },
      },
      {
        id: 24,
        text: "Nemo et et.",
        UserId: 3,
        RestaurantId: 24,
        createdAt: "2021-07-05T09:58:39.000Z",
        updatedAt: "2021-07-05T09:58:39.000Z",
        Restaurant: {
          id: 24,
          name: "Gaston Kling",
          tel: "(708) 855-8661 x75533",
          address: "909 Fay Dam",
          opening_hours: "08:00",
          description: "ea voluptas aut",
          image:
            "https://loremflickr.com/320/240/restaurant,food/?random=96.87323114124236",
          viewCounts: 0,
          createdAt: "2021-07-05T09:58:39.000Z",
          updatedAt: "2021-07-05T09:58:39.000Z",
          CategoryId: 1,
        },
      },
      {
        id: 25,
        text: "Repudiandae ex nihil aut id qui recusandae quis dolore eos.",
        UserId: 3,
        RestaurantId: 25,
        createdAt: "2021-07-05T09:58:39.000Z",
        updatedAt: "2021-07-05T09:58:39.000Z",
        Restaurant: {
          id: 25,
          name: "Afton Murphy",
          tel: "438.437.3292 x916",
          address: "4301 Maggio Circle",
          opening_hours: "08:00",
          description:
            "Illo aliquid illo qui id. Assumenda pariatur vel laboriosam tenetur blanditiis officiis. Eos animi debitis in consequatur et est optio corrupti.",
          image:
            "https://loremflickr.com/320/240/restaurant,food/?random=13.195154350746119",
          viewCounts: 0,
          createdAt: "2021-07-05T09:58:39.000Z",
          updatedAt: "2021-07-05T09:58:39.000Z",
          CategoryId: 3,
        },
      },
      {
        id: 28,
        text: "Hic asperiores qui cupiditate vero natus.",
        UserId: 3,
        RestaurantId: 28,
        createdAt: "2021-07-05T09:58:39.000Z",
        updatedAt: "2021-07-05T09:58:39.000Z",
        Restaurant: {
          id: 28,
          name: "Reva Schumm",
          tel: "547-635-2744",
          address: "33104 Lubowitz Ramp",
          opening_hours: "08:00",
          description:
            "Nobis quis magnam explicabo aut totam inventore ea sunt. Quia architecto eos facilis et. Nostrum doloribus ratione in et tempore sed placeat dolores.",
          image:
            "https://loremflickr.com/320/240/restaurant,food/?random=27.02680740417993",
          viewCounts: 0,
          createdAt: "2021-07-05T09:58:39.000Z",
          updatedAt: "2021-07-05T09:58:39.000Z",
          CategoryId: 2,
        },
      },
      {
        id: 31,
        text: "Tenetur consectetur sit doloribus eligendi velit in eos sit.",
        UserId: 3,
        RestaurantId: 31,
        createdAt: "2021-07-05T09:58:39.000Z",
        updatedAt: "2021-07-05T09:58:39.000Z",
        Restaurant: {
          id: 31,
          name: "Davon Brekke",
          tel: "304.977.5039",
          address: "87204 Anabel Run",
          opening_hours: "08:00",
          description: "deserunt",
          image:
            "https://loremflickr.com/320/240/restaurant,food/?random=78.05701639231799",
          viewCounts: 0,
          createdAt: "2021-07-05T09:58:39.000Z",
          updatedAt: "2021-07-05T09:58:39.000Z",
          CategoryId: 1,
        },
      },
      {
        id: 32,
        text: "Et doloribus doloremque quibusdam omnis molestiae.",
        UserId: 3,
        RestaurantId: 32,
        createdAt: "2021-07-05T09:58:39.000Z",
        updatedAt: "2021-07-05T09:58:39.000Z",
        Restaurant: {
          id: 32,
          name: "Adrain Weimann",
          tel: "768-248-6868",
          address: "751 Cruickshank Mall",
          opening_hours: "08:00",
          description:
            "Voluptas alias saepe illo sit et. Dolores eligendi ducimus aut saepe. Incidunt et consectetur fuga totam harum ut. Doloremque beatae iste ut tempora. Placeat soluta est architecto inventore sunt. Qui quia occaecati.\n \rEligendi voluptatem omnis optio. Illo excepturi qui officiis. Corporis autem officiis ut quod fugit aut veniam saepe. Assumenda quia est est. Suscipit facere sit.\n \rUt facere ut est fugit autem molestiae ut corrupti. Reprehenderit omnis perferendis. Deleniti voluptas et minima voluptatem tenetur. Molestias qui ut voluptate aut qui ex enim. Dolore facilis qui.",
          image:
            "https://loremflickr.com/320/240/restaurant,food/?random=84.19181375649187",
          viewCounts: 0,
          createdAt: "2021-07-05T09:58:39.000Z",
          updatedAt: "2021-07-05T09:58:39.000Z",
          CategoryId: 1,
        },
      },
      {
        id: 36,
        text: "Voluptatem et mollitia.",
        UserId: 3,
        RestaurantId: 36,
        createdAt: "2021-07-05T09:58:39.000Z",
        updatedAt: "2021-07-05T09:58:39.000Z",
        Restaurant: {
          id: 36,
          name: "Wilber Kris DDS",
          tel: "(305) 011-8979",
          address: "2663 Wehner Mountain",
          opening_hours: "08:00",
          description:
            "Omnis nulla vel. Exercitationem velit voluptatem nulla dolor molestiae dolorem minus autem omnis. Sint voluptas soluta quisquam. Optio tenetur voluptates accusamus maxime nihil. Eos iste et iste nemo.",
          image:
            "https://loremflickr.com/320/240/restaurant,food/?random=74.73254288482138",
          viewCounts: 0,
          createdAt: "2021-07-05T09:58:39.000Z",
          updatedAt: "2021-07-05T09:58:39.000Z",
          CategoryId: 4,
        },
      },
      {
        id: 41,
        text:
          "Quasi explicabo neque modi modi voluptas laboriosam officiis rerum enim.",
        UserId: 3,
        RestaurantId: 41,
        createdAt: "2021-07-05T09:58:39.000Z",
        updatedAt: "2021-07-05T09:58:39.000Z",
        Restaurant: {
          id: 41,
          name: "Dr. Martin Brakus",
          tel: "115.702.0905",
          address: "82579 Marisol Cove",
          opening_hours: "08:00",
          description:
            "Sint est sapiente nobis quos.\nDolorem magnam hic velit ut inventore repudiandae sequi.\nVoluptate fuga optio fuga beatae eaque quibusdam rem et et.\nMaxime impedit et ut nulla libero facere ea veritatis recusandae.",
          image:
            "https://loremflickr.com/320/240/restaurant,food/?random=18.43070357643328",
          viewCounts: 0,
          createdAt: "2021-07-05T09:58:39.000Z",
          updatedAt: "2021-07-05T09:58:39.000Z",
          CategoryId: 5,
        },
      },
      {
        id: 42,
        text: "Distinctio consequuntur qui.",
        UserId: 3,
        RestaurantId: 42,
        createdAt: "2021-07-05T09:58:39.000Z",
        updatedAt: "2021-07-05T09:58:39.000Z",
        Restaurant: {
          id: 42,
          name: "Antonina Kertzmann",
          tel: "(003) 546-3071 x1643",
          address: "09962 Ubaldo Greens",
          opening_hours: "08:00",
          description:
            "Eveniet aut recusandae quibusdam molestias ipsum voluptas quis aliquid. Voluptatem iste voluptatem voluptatem. Minus modi eos laudantium. Hic est ratione.\n \rEveniet blanditiis sit quam fuga ut facere veritatis. Voluptates enim et dolores non necessitatibus esse libero et. Sit quibusdam natus. Dicta tempore minus amet. Omnis voluptates labore consequatur.\n \rAperiam numquam possimus hic et vero molestiae. Quo et adipisci aperiam possimus et dolores ipsum facere iste. Consectetur et quia totam est itaque nisi dolorum maiores doloribus.",
          image:
            "https://loremflickr.com/320/240/restaurant,food/?random=6.102346859200214",
          viewCounts: 0,
          createdAt: "2021-07-05T09:58:39.000Z",
          updatedAt: "2021-07-05T09:58:39.000Z",
          CategoryId: 3,
        },
      },
      {
        id: 44,
        text: "Sit aut molestiae qui.",
        UserId: 3,
        RestaurantId: 44,
        createdAt: "2021-07-05T09:58:39.000Z",
        updatedAt: "2021-07-05T09:58:39.000Z",
        Restaurant: {
          id: 44,
          name: "Ms. Lurline Corkery",
          tel: "326-487-5062",
          address: "635 Rippin Ramp",
          opening_hours: "08:00",
          description: "earum in culpa",
          image:
            "https://loremflickr.com/320/240/restaurant,food/?random=68.81906281304802",
          viewCounts: 0,
          createdAt: "2021-07-05T09:58:39.000Z",
          updatedAt: "2021-07-05T09:58:39.000Z",
          CategoryId: 1,
        },
      },
      {
        id: 49,
        text: "Voluptates sit labore ad inventore in ipsum.",
        UserId: 3,
        RestaurantId: 49,
        createdAt: "2021-07-05T09:58:39.000Z",
        updatedAt: "2021-07-05T09:58:39.000Z",
        Restaurant: {
          id: 49,
          name: "Hildegard Roberts",
          tel: "129-461-5879 x06306",
          address: "606 Jimmy Overpass",
          opening_hours: "08:00",
          description: "voluptate ut blanditiis",
          image:
            "https://loremflickr.com/320/240/restaurant,food/?random=93.10105269151492",
          viewCounts: 0,
          createdAt: "2021-07-05T09:58:39.000Z",
          updatedAt: "2021-07-05T09:58:39.000Z",
          CategoryId: 3,
        },
      },
      {
        id: 54,
        text: "Qui eos odio similique.",
        UserId: 3,
        RestaurantId: 4,
        createdAt: "2021-07-05T09:58:39.000Z",
        updatedAt: "2021-07-05T09:58:39.000Z",
        Restaurant: {
          id: 4,
          name: "Mckayla Hintz",
          tel: "1-240-532-2429",
          address: "167 Rogahn Mission",
          opening_hours: "08:00",
          description:
            "Impedit nesciunt ad id delectus magnam aspernatur fugit.",
          image:
            "https://loremflickr.com/320/240/restaurant,food/?random=42.58020446504014",
          viewCounts: 35,
          createdAt: "2021-07-05T09:58:39.000Z",
          updatedAt: "2021-08-25T11:23:37.000Z",
          CategoryId: 4,
        },
      },
      {
        id: 59,
        text: "Facilis expedita et ut.",
        UserId: 3,
        RestaurantId: 9,
        createdAt: "2021-07-05T09:58:39.000Z",
        updatedAt: "2021-07-05T09:58:39.000Z",
        Restaurant: {
          id: 9,
          name: "Roman Kunde",
          tel: "(051) 925-0555 x1731",
          address: "131 Hoyt Mission",
          opening_hours: "08:00",
          description:
            "Et dolorum voluptas.\nSint eveniet ratione id praesentium totam.\nImpedit aliquam nobis quia pariatur consequatur quae eos quas cum.",
          image:
            "https://loremflickr.com/320/240/restaurant,food/?random=55.144782599599694",
          viewCounts: 47,
          createdAt: "2021-07-05T09:58:39.000Z",
          updatedAt: "2021-08-20T15:08:22.000Z",
          CategoryId: 2,
        },
      },
      {
        id: 60,
        text: "Cum sit facere aperiam nisi non cum sunt omnis quam.",
        UserId: 3,
        RestaurantId: 10,
        createdAt: "2021-07-05T09:58:39.000Z",
        updatedAt: "2021-07-05T09:58:39.000Z",
        Restaurant: {
          id: 10,
          name: "Iva Dickinson Jr.",
          tel: "757.545.3970",
          address: "575 Clementine Neck",
          opening_hours: "08:00",
          description:
            "Consequuntur nam corporis adipisci. Voluptate vero perferendis rem fuga et. Animi quam sapiente dolorem voluptate quo deserunt distinctio. Dignissimos dolorem sunt fugit sint temporibus iste necessitatibus est. Repudiandae cupiditate nihil vitae maiores rerum consectetur neque. Nulla voluptatem qui hic eligendi voluptas quis.",
          image:
            "https://loremflickr.com/320/240/restaurant,food/?random=63.73718248364722",
          viewCounts: 0,
          createdAt: "2021-07-05T09:58:39.000Z",
          updatedAt: "2021-07-05T09:58:39.000Z",
          CategoryId: 1,
        },
      },
      {
        id: 65,
        text: "Deserunt eligendi rem omnis quia.",
        UserId: 3,
        RestaurantId: 15,
        createdAt: "2021-07-05T09:58:39.000Z",
        updatedAt: "2021-07-05T09:58:39.000Z",
        Restaurant: {
          id: 15,
          name: "Miss Alda Gibson",
          tel: "973-829-4302 x72994",
          address: "82826 Hilton Estates",
          opening_hours: "08:00",
          description:
            "Porro deserunt delectus ut officiis reiciendis animi magni assumenda placeat. Occaecati ut in quos et et. Repellendus at molestias omnis quae rerum. Blanditiis deserunt corporis aliquam molestiae delectus eos enim quasi aut.",
          image:
            "https://loremflickr.com/320/240/restaurant,food/?random=85.30074855159819",
          viewCounts: 0,
          createdAt: "2021-07-05T09:58:39.000Z",
          updatedAt: "2021-07-05T09:58:39.000Z",
          CategoryId: 5,
        },
      },
      {
        id: 67,
        text: "Libero vel cumque vero aliquid.",
        UserId: 3,
        RestaurantId: 17,
        createdAt: "2021-07-05T09:58:39.000Z",
        updatedAt: "2021-07-05T09:58:39.000Z",
        Restaurant: {
          id: 17,
          name: "Johnathan Lowe",
          tel: "978.861.5244 x080",
          address: "914 Cole Expressway",
          opening_hours: "08:00",
          description: "illum",
          image:
            "https://loremflickr.com/320/240/restaurant,food/?random=76.7964021859454",
          viewCounts: 0,
          createdAt: "2021-07-05T09:58:39.000Z",
          updatedAt: "2021-07-05T09:58:39.000Z",
          CategoryId: 4,
        },
      },
      {
        id: 79,
        text: "Laudantium cum earum molestiae.",
        UserId: 3,
        RestaurantId: 29,
        createdAt: "2021-07-05T09:58:39.000Z",
        updatedAt: "2021-07-05T09:58:39.000Z",
        Restaurant: {
          id: 29,
          name: "Candace Glover",
          tel: "1-370-421-3051 x05665",
          address: "09822 Okuneva Squares",
          opening_hours: "08:00",
          description:
            "Cum nam et cupiditate facere. Occaecati neque illo. Et ea dicta eveniet inventore pariatur assumenda. Iure assumenda consequuntur doloremque aspernatur voluptatem. Cupiditate odio error aut dolor dignissimos quisquam.",
          image:
            "https://loremflickr.com/320/240/restaurant,food/?random=75.16829827776488",
          viewCounts: 0,
          createdAt: "2021-07-05T09:58:39.000Z",
          updatedAt: "2021-07-05T09:58:39.000Z",
          CategoryId: 1,
        },
      },
      {
        id: 80,
        text: "Qui iusto enim dolorem voluptatem architecto.",
        UserId: 3,
        RestaurantId: 30,
        createdAt: "2021-07-05T09:58:39.000Z",
        updatedAt: "2021-07-05T09:58:39.000Z",
        Restaurant: {
          id: 30,
          name: "Mr. Tre Dach",
          tel: "1-637-472-5413",
          address: "18547 Mohr Point",
          opening_hours: "08:00",
          description: "Officia qui ipsa quibusdam vel.",
          image:
            "https://loremflickr.com/320/240/restaurant,food/?random=71.67092943471769",
          viewCounts: 0,
          createdAt: "2021-07-05T09:58:39.000Z",
          updatedAt: "2021-07-05T09:58:39.000Z",
          CategoryId: 3,
        },
      },
      {
        id: 84,
        text: "Velit ea ea et.",
        UserId: 3,
        RestaurantId: 34,
        createdAt: "2021-07-05T09:58:39.000Z",
        updatedAt: "2021-07-05T09:58:39.000Z",
        Restaurant: {
          id: 34,
          name: "Rex Wiza",
          tel: "807-036-9750 x49664",
          address: "4093 Eugene Ford",
          opening_hours: "08:00",
          description:
            "Et dolore non id dolorem molestiae minima eos dolorem. Architecto qui est aut dolorem molestias facere voluptatibus. Aspernatur qui distinctio. Totam qui blanditiis necessitatibus omnis laudantium enim aut.\n \rQuibusdam laborum culpa hic. Laborum ex doloribus non nemo ullam in omnis repellendus. Ut maiores odit quibusdam. Non ea eligendi vel quaerat temporibus qui. At perferendis sequi voluptatem odit modi voluptatum. Iure quod sit quam facere hic a unde.\n \rHarum nesciunt officia. Nemo eveniet eveniet et sunt vel. Omnis quisquam quod. Et quae totam quasi reiciendis est ut. Porro laboriosam est vero laudantium voluptate qui ut pariatur sit.",
          image:
            "https://loremflickr.com/320/240/restaurant,food/?random=44.79932925723848",
          viewCounts: 0,
          createdAt: "2021-07-05T09:58:39.000Z",
          updatedAt: "2021-07-05T09:58:39.000Z",
          CategoryId: 5,
        },
      },
      {
        id: 94,
        text: "Dolorum harum aut illum incidunt aut.",
        UserId: 3,
        RestaurantId: 44,
        createdAt: "2021-07-05T09:58:39.000Z",
        updatedAt: "2021-07-05T09:58:39.000Z",
        Restaurant: {
          id: 44,
          name: "Ms. Lurline Corkery",
          tel: "326-487-5062",
          address: "635 Rippin Ramp",
          opening_hours: "08:00",
          description: "earum in culpa",
          image:
            "https://loremflickr.com/320/240/restaurant,food/?random=68.81906281304802",
          viewCounts: 0,
          createdAt: "2021-07-05T09:58:39.000Z",
          updatedAt: "2021-07-05T09:58:39.000Z",
          CategoryId: 1,
        },
      },
      {
        id: 98,
        text: "Aperiam et enim ullam illo ut corrupti sequi quidem.",
        UserId: 3,
        RestaurantId: 48,
        createdAt: "2021-07-05T09:58:39.000Z",
        updatedAt: "2021-07-05T09:58:39.000Z",
        Restaurant: {
          id: 48,
          name: "Edgar Toy",
          tel: "1-784-399-1059 x571",
          address: "7994 Winston Circle",
          opening_hours: "08:00",
          description:
            "Vitae maxime molestias vero vero dolores vero sed fugiat nam.",
          image:
            "https://loremflickr.com/320/240/restaurant,food/?random=20.170836111399094",
          viewCounts: 0,
          createdAt: "2021-07-05T09:58:39.000Z",
          updatedAt: "2021-07-05T09:58:39.000Z",
          CategoryId: 3,
        },
      },
      {
        id: 99,
        text: "Omnis occaecati consequuntur omnis omnis sed rerum ullam.",
        UserId: 3,
        RestaurantId: 49,
        createdAt: "2021-07-05T09:58:39.000Z",
        updatedAt: "2021-07-05T09:58:39.000Z",
        Restaurant: {
          id: 49,
          name: "Hildegard Roberts",
          tel: "129-461-5879 x06306",
          address: "606 Jimmy Overpass",
          opening_hours: "08:00",
          description: "voluptate ut blanditiis",
          image:
            "https://loremflickr.com/320/240/restaurant,food/?random=93.10105269151492",
          viewCounts: 0,
          createdAt: "2021-07-05T09:58:39.000Z",
          updatedAt: "2021-07-05T09:58:39.000Z",
          CategoryId: 3,
        },
      },
      {
        id: 100,
        text: "Voluptatem vel reprehenderit iusto quidem doloribus voluptatum.",
        UserId: 3,
        RestaurantId: 50,
        createdAt: "2021-07-05T09:58:39.000Z",
        updatedAt: "2021-07-05T09:58:39.000Z",
        Restaurant: {
          id: 50,
          name: "Deshaun Zboncak",
          tel: "491-316-6241 x8970",
          address: "44998 Daniel Dam",
          opening_hours: "08:00",
          description:
            "Adipisci in omnis consectetur ullam dolores id ut sunt.",
          image:
            "https://loremflickr.com/320/240/restaurant,food/?random=80.08532188319566",
          viewCounts: 3,
          createdAt: "2021-07-05T09:58:39.000Z",
          updatedAt: "2021-07-06T16:02:38.000Z",
          CategoryId: 4,
        },
      },
      {
        id: 120,
        text: "Veritatis repellendus minus dolorem culpa perferendis.",
        UserId: 3,
        RestaurantId: 20,
        createdAt: "2021-07-05T09:58:39.000Z",
        updatedAt: "2021-07-05T09:58:39.000Z",
        Restaurant: {
          id: 20,
          name: "Else Upton",
          tel: "(988) 533-7136 x87414",
          address: "039 Oswald Estate",
          opening_hours: "08:00",
          description: "vero",
          image:
            "https://loremflickr.com/320/240/restaurant,food/?random=67.29361970658665",
          viewCounts: 0,
          createdAt: "2021-07-05T09:58:39.000Z",
          updatedAt: "2021-07-05T09:58:39.000Z",
          CategoryId: 5,
        },
      },
      {
        id: 124,
        text: "Quaerat accusamus quaerat non quae ipsam ullam natus rerum.",
        UserId: 3,
        RestaurantId: 24,
        createdAt: "2021-07-05T09:58:39.000Z",
        updatedAt: "2021-07-05T09:58:39.000Z",
        Restaurant: {
          id: 24,
          name: "Gaston Kling",
          tel: "(708) 855-8661 x75533",
          address: "909 Fay Dam",
          opening_hours: "08:00",
          description: "ea voluptas aut",
          image:
            "https://loremflickr.com/320/240/restaurant,food/?random=96.87323114124236",
          viewCounts: 0,
          createdAt: "2021-07-05T09:58:39.000Z",
          updatedAt: "2021-07-05T09:58:39.000Z",
          CategoryId: 1,
        },
      },
      {
        id: 125,
        text: "Animi quam nesciunt vero est quisquam dolores nostrum ut.",
        UserId: 3,
        RestaurantId: 25,
        createdAt: "2021-07-05T09:58:39.000Z",
        updatedAt: "2021-07-05T09:58:39.000Z",
        Restaurant: {
          id: 25,
          name: "Afton Murphy",
          tel: "438.437.3292 x916",
          address: "4301 Maggio Circle",
          opening_hours: "08:00",
          description:
            "Illo aliquid illo qui id. Assumenda pariatur vel laboriosam tenetur blanditiis officiis. Eos animi debitis in consequatur et est optio corrupti.",
          image:
            "https://loremflickr.com/320/240/restaurant,food/?random=13.195154350746119",
          viewCounts: 0,
          createdAt: "2021-07-05T09:58:39.000Z",
          updatedAt: "2021-07-05T09:58:39.000Z",
          CategoryId: 3,
        },
      },
      {
        id: 127,
        text: "Voluptatem voluptas porro.",
        UserId: 3,
        RestaurantId: 27,
        createdAt: "2021-07-05T09:58:39.000Z",
        updatedAt: "2021-07-05T09:58:39.000Z",
        Restaurant: {
          id: 27,
          name: "Aletha O'Conner",
          tel: "(922) 167-1501",
          address: "92695 Emerald Cape",
          opening_hours: "08:00",
          description:
            "Necessitatibus laborum vero ab pariatur natus est corporis mollitia. Corrupti necessitatibus aut quia officia velit sed officia provident. Non voluptas laboriosam illo laudantium recusandae officiis ducimus. Eius voluptatem ex voluptate minus repellat iste.",
          image:
            "https://loremflickr.com/320/240/restaurant,food/?random=15.27386788198173",
          viewCounts: 0,
          createdAt: "2021-07-05T09:58:39.000Z",
          updatedAt: "2021-07-05T09:58:39.000Z",
          CategoryId: 3,
        },
      },
      {
        id: 130,
        text: "Voluptas ad autem autem sit expedita ut illo quod.",
        UserId: 3,
        RestaurantId: 30,
        createdAt: "2021-07-05T09:58:39.000Z",
        updatedAt: "2021-07-05T09:58:39.000Z",
        Restaurant: {
          id: 30,
          name: "Mr. Tre Dach",
          tel: "1-637-472-5413",
          address: "18547 Mohr Point",
          opening_hours: "08:00",
          description: "Officia qui ipsa quibusdam vel.",
          image:
            "https://loremflickr.com/320/240/restaurant,food/?random=71.67092943471769",
          viewCounts: 0,
          createdAt: "2021-07-05T09:58:39.000Z",
          updatedAt: "2021-07-05T09:58:39.000Z",
          CategoryId: 3,
        },
      },
      {
        id: 131,
        text: "Consectetur et qui et culpa ut sit sunt hic.",
        UserId: 3,
        RestaurantId: 31,
        createdAt: "2021-07-05T09:58:39.000Z",
        updatedAt: "2021-07-05T09:58:39.000Z",
        Restaurant: {
          id: 31,
          name: "Davon Brekke",
          tel: "304.977.5039",
          address: "87204 Anabel Run",
          opening_hours: "08:00",
          description: "deserunt",
          image:
            "https://loremflickr.com/320/240/restaurant,food/?random=78.05701639231799",
          viewCounts: 0,
          createdAt: "2021-07-05T09:58:39.000Z",
          updatedAt: "2021-07-05T09:58:39.000Z",
          CategoryId: 1,
        },
      },
      {
        id: 134,
        text: "Molestiae laudantium architecto laboriosam corrupti.",
        UserId: 3,
        RestaurantId: 34,
        createdAt: "2021-07-05T09:58:39.000Z",
        updatedAt: "2021-07-05T09:58:39.000Z",
        Restaurant: {
          id: 34,
          name: "Rex Wiza",
          tel: "807-036-9750 x49664",
          address: "4093 Eugene Ford",
          opening_hours: "08:00",
          description:
            "Et dolore non id dolorem molestiae minima eos dolorem. Architecto qui est aut dolorem molestias facere voluptatibus. Aspernatur qui distinctio. Totam qui blanditiis necessitatibus omnis laudantium enim aut.\n \rQuibusdam laborum culpa hic. Laborum ex doloribus non nemo ullam in omnis repellendus. Ut maiores odit quibusdam. Non ea eligendi vel quaerat temporibus qui. At perferendis sequi voluptatem odit modi voluptatum. Iure quod sit quam facere hic a unde.\n \rHarum nesciunt officia. Nemo eveniet eveniet et sunt vel. Omnis quisquam quod. Et quae totam quasi reiciendis est ut. Porro laboriosam est vero laudantium voluptate qui ut pariatur sit.",
          image:
            "https://loremflickr.com/320/240/restaurant,food/?random=44.79932925723848",
          viewCounts: 0,
          createdAt: "2021-07-05T09:58:39.000Z",
          updatedAt: "2021-07-05T09:58:39.000Z",
          CategoryId: 5,
        },
      },
      {
        id: 137,
        text: "Ipsa quia incidunt optio iste velit deleniti tempore.",
        UserId: 3,
        RestaurantId: 37,
        createdAt: "2021-07-05T09:58:39.000Z",
        updatedAt: "2021-07-05T09:58:39.000Z",
        Restaurant: {
          id: 37,
          name: "Ada Pacocha",
          tel: "1-194-835-4641 x9038",
          address: "72766 Tanya Cliffs",
          opening_hours: "08:00",
          description:
            "Accusamus quibusdam quis hic qui cumque iste.\nQui quisquam et fuga et et assumenda iusto.\nSuscipit alias atque quia.\nEaque dolorum libero debitis et incidunt eius neque sunt debitis.\nInventore ea nisi iure aperiam molestiae quo deleniti.",
          image:
            "https://loremflickr.com/320/240/restaurant,food/?random=26.80465255967157",
          viewCounts: 0,
          createdAt: "2021-07-05T09:58:39.000Z",
          updatedAt: "2021-07-05T09:58:39.000Z",
          CategoryId: 2,
        },
      },
      {
        id: 141,
        text: "Ut qui quaerat ipsam est qui quis soluta excepturi sint.",
        UserId: 3,
        RestaurantId: 41,
        createdAt: "2021-07-05T09:58:39.000Z",
        updatedAt: "2021-07-05T09:58:39.000Z",
        Restaurant: {
          id: 41,
          name: "Dr. Martin Brakus",
          tel: "115.702.0905",
          address: "82579 Marisol Cove",
          opening_hours: "08:00",
          description:
            "Sint est sapiente nobis quos.\nDolorem magnam hic velit ut inventore repudiandae sequi.\nVoluptate fuga optio fuga beatae eaque quibusdam rem et et.\nMaxime impedit et ut nulla libero facere ea veritatis recusandae.",
          image:
            "https://loremflickr.com/320/240/restaurant,food/?random=18.43070357643328",
          viewCounts: 0,
          createdAt: "2021-07-05T09:58:39.000Z",
          updatedAt: "2021-07-05T09:58:39.000Z",
          CategoryId: 5,
        },
      },
      {
        id: 142,
        text: "Cum eos error adipisci assumenda molestias officiis placeat.",
        UserId: 3,
        RestaurantId: 42,
        createdAt: "2021-07-05T09:58:39.000Z",
        updatedAt: "2021-07-05T09:58:39.000Z",
        Restaurant: {
          id: 42,
          name: "Antonina Kertzmann",
          tel: "(003) 546-3071 x1643",
          address: "09962 Ubaldo Greens",
          opening_hours: "08:00",
          description:
            "Eveniet aut recusandae quibusdam molestias ipsum voluptas quis aliquid. Voluptatem iste voluptatem voluptatem. Minus modi eos laudantium. Hic est ratione.\n \rEveniet blanditiis sit quam fuga ut facere veritatis. Voluptates enim et dolores non necessitatibus esse libero et. Sit quibusdam natus. Dicta tempore minus amet. Omnis voluptates labore consequatur.\n \rAperiam numquam possimus hic et vero molestiae. Quo et adipisci aperiam possimus et dolores ipsum facere iste. Consectetur et quia totam est itaque nisi dolorum maiores doloribus.",
          image:
            "https://loremflickr.com/320/240/restaurant,food/?random=6.102346859200214",
          viewCounts: 0,
          createdAt: "2021-07-05T09:58:39.000Z",
          updatedAt: "2021-07-05T09:58:39.000Z",
          CategoryId: 3,
        },
      },
      {
        id: 149,
        text: "Quia unde et et officiis autem voluptatem quos ut iusto.",
        UserId: 3,
        RestaurantId: 49,
        createdAt: "2021-07-05T09:58:39.000Z",
        updatedAt: "2021-07-05T09:58:39.000Z",
        Restaurant: {
          id: 49,
          name: "Hildegard Roberts",
          tel: "129-461-5879 x06306",
          address: "606 Jimmy Overpass",
          opening_hours: "08:00",
          description: "voluptate ut blanditiis",
          image:
            "https://loremflickr.com/320/240/restaurant,food/?random=93.10105269151492",
          viewCounts: 0,
          createdAt: "2021-07-05T09:58:39.000Z",
          updatedAt: "2021-07-05T09:58:39.000Z",
          CategoryId: 3,
        },
      },
      {
        id: 150,
        text: "Iste praesentium cumque ex aut nostrum illum porro vitae.",
        UserId: 3,
        RestaurantId: 50,
        createdAt: "2021-07-05T09:58:39.000Z",
        updatedAt: "2021-07-05T09:58:39.000Z",
        Restaurant: {
          id: 50,
          name: "Deshaun Zboncak",
          tel: "491-316-6241 x8970",
          address: "44998 Daniel Dam",
          opening_hours: "08:00",
          description:
            "Adipisci in omnis consectetur ullam dolores id ut sunt.",
          image:
            "https://loremflickr.com/320/240/restaurant,food/?random=80.08532188319566",
          viewCounts: 3,
          createdAt: "2021-07-05T09:58:39.000Z",
          updatedAt: "2021-07-06T16:02:38.000Z",
          CategoryId: 4,
        },
      },
    ],
    FavoritedRestaurants: [],
    Followers: [
      {
        id: 1,
        name: "root123",
        email: "root@example.com",
        password:
          "$2a$10$K2x6pQHkzPEKzw86x8Tc0.bfW7QVdA2Ls4AXBFkFu7xHG3UgA4Mli",
        isAdmin: true,
        image: "https://i.imgur.com/KVFFj35.jpeg",
        createdAt: "2021-07-05T09:58:39.000Z",
        updatedAt: "2021-08-08T16:49:05.000Z",
        Followship: {
          followerId: 1,
          followingId: 3,
          createdAt: "2021-08-21T16:00:56.000Z",
          updatedAt: "2021-08-21T16:00:56.000Z",
        },
      },
      {
        id: 81,
        name: "test",
        email: "test@example.com",
        password:
          "$2a$10$w5bcczmxLzWr/lE9a6fgz.toso5IO1oetOBMHZJK/fM3mGAEtsrAK",
        isAdmin: false,
        image: null,
        createdAt: "2021-08-25T11:13:24.000Z",
        updatedAt: "2021-08-25T11:13:24.000Z",
        Followship: {
          followerId: 81,
          followingId: 3,
          createdAt: "2021-08-25T11:22:31.000Z",
          updatedAt: "2021-08-25T11:22:31.000Z",
        },
      },
    ],
    Followings: [],
  },
  isFollowed: true,
};

export default {
  name: "AdminUsers",
  components: { AdminNav },
  data() {
    return {
      users: [],
      profile: {
        id: 0,
        name: "",
        email: "",
        password: "",
        isAdmin: false,
        image: null,
        createdAt: "",
        updatedAt: "",
        Comments: [],
      },
    };
  },
  methods: {
    fetchUser () {
      this.users = dummyData.users.map((user) => {
         return user
      });
      this.profile = { ...dummyUser.profile };
    },
    toggleUserRole (userId) {
      console.log(userId);
      this.users = this.users.map((user) => {
        if (user.id === userId) {
          return {
            ...user,
            isAdmin: !user.isAdmin,
          };
        }
        return user
      });
    },
  },
  created() {
    this.fetchUser();
  },
};
</script>
