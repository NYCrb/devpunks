require "./easy_data"

# Terminology
#
# data hash:
# a hash with at least one non-hash value
#
# data object:
# has attributes that can be accessed using dot notation

RSpec.describe "easy data" do
  let(:caesar) do
    {
      name: "Caesar",
      age: 40
    }
  end

  def handle obj
    DevPunks::EasyData.transform obj
  end

  it "turns data hashes into data objects" do
    expect(handle caesar).to have_attributes caesar
  end

  it "leaves nested hashes as hashes" do
    expect(handle(person: caesar)).to be_a Hash
  end

  it "parses markdown in string attributes" do
    expect(
      handle caesar.merge(
        description: "inventor of *salad*"
      )
    ).to have_attributes description: "inventor of <em>salad</em>"
  end

  it "parses markdown in arrays of strings" do
    expect(handle ["*foo*", "bar"]).to eq ["<em>foo</em>", "bar"]
  end

  it "splits multi para heredoc-style text (> in yaml) into arrays" do
    expect(
      handle caesar.merge(
        history: "betrayed by his brother Cobb\ndied of high cholesterol"
      )
    ).to have_attributes history: ["betrayed by his brother Cobb", "died of high cholesterol"]
  end

  it "splits single para heredoc-style text (> in yaml) into arrays" do
    expect(
      handle caesar.merge(
        history: "betrayed by his brother Cobb\n"
      )
    ).to have_attributes history: ["betrayed by his brother Cobb"]
  end
end
