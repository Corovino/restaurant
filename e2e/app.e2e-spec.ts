import { RestaurantAppPage } from './app.po';

describe('restaurant-app App', () => {
  let page: RestaurantAppPage;

  beforeEach(() => {
    page = new RestaurantAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
